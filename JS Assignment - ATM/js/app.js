let currentUser = null;

function showScreen(id) {
    document.querySelectorAll(".card").forEach(div => div.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");

    if (id === "screen-balance") {
        document.getElementById("balance-amount").innerText = "₹" + currentUser.getBalance();
        document.getElementById("balance-type").innerText   = currentUser.getAccountType();
    }
    if (id === "screen-withdraw") {
        document.getElementById("withdraw-amount").value = "";
        document.getElementById("withdraw-msg").innerText = "";
        document.getElementById("withdraw-form").classList.remove("hidden");
    }
    if (id === "screen-deposit") {
        document.getElementById("deposit-amount").value = "";
        document.getElementById("deposit-msg").innerText = "";
        document.getElementById("deposit-form").classList.remove("hidden");
    }
    if (id === "screen-changepin") {
        document.getElementById("current-pin").value = "";
        document.getElementById("new-pin").value = "";
        document.getElementById("changepin-msg").innerText = "";
        document.getElementById("changepin-form").classList.remove("hidden");
    }
}

function showLogin() {
    showScreen("screen-login");
}

function validateUser() {
    const accNo = document.getElementById("accountNo").value;
    const pin   = document.getElementById("pin").value;

    const user = users.find(u => u.validateAccount(accNo) && u.validatePin(pin));

    if (user) {
        currentUser = user;
        document.getElementById("accountNo").value = "";
        document.getElementById("pin").value = "";
        document.getElementById("welcome-user").innerText = "Welcome, " + currentUser.getName();
        document.getElementById("account-type").innerText = currentUser.getAccountType();
        showScreen("screen-home");
    } else {
        document.getElementById("accountNo").value = "";
        document.getElementById("pin").value = "";
        document.getElementById("error-message").innerText = "Invalid Account No or PIN";
    }
}

function doWithdraw() {
    const amount = Number(document.getElementById("withdraw-amount").value);
    const msg    = document.getElementById("withdraw-msg");

    if (!amount || amount <= 0) {
        msg.className = "msg error";
        msg.innerText = "Enter a valid amount.";
        return;
    }

    const accountResult = currentUser.withdraw(amount);
    if (!accountResult.success) {
        msg.className = "msg error";
        msg.innerText = accountResult.reason;
        return;
    }

    const atmResult = atm.dispenseCash(amount);
    if (!atmResult.success) {
        currentUser.deposit(amount); // put balance back since ATM can't dispense
        msg.className = "msg error";
        msg.innerText = atmResult.reason;
        return;
    }

    document.getElementById("withdraw-form").classList.add("hidden");
    msg.className = "msg success";
    msg.innerText = "Transaction Successful! Please take your amount of ₹" + amount + ".";
}

function doDeposit() {
    const amount = Number(document.getElementById("deposit-amount").value);
    const msg    = document.getElementById("deposit-msg");

    if (!amount || amount <= 0) {
        msg.className = "msg error";
        msg.innerText = "Enter a valid amount.";
        return;
    }

    currentUser.deposit(amount);
    atm.receiveCash(amount);
    document.getElementById("deposit-form").classList.add("hidden");
    msg.className = "msg success";
    msg.innerText = "Deposit Successful! ₹" + amount + " has been added to your account.";
}

function doChangePin() {
    const currentPin = document.getElementById("current-pin").value;
    const newPin     = document.getElementById("new-pin").value;
    const msg        = document.getElementById("changepin-msg");

    if (!currentUser.validatePin(currentPin)) {
        msg.className = "msg error";
        msg.innerText = "Incorrect current PIN.";
        return;
    }
    if (!newPin) {
        msg.className = "msg error";
        msg.innerText = "New PIN cannot be empty.";
        return;
    }

    currentUser.setPin(newPin);
    document.getElementById("changepin-form").classList.add("hidden");
    msg.className = "msg success";
    msg.innerText = "PIN changed successfully.";
}

function logout() {
    currentUser = null;
    showScreen("screen-welcome");
}
