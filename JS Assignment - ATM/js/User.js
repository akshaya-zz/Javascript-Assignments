class BankAccount {
    #accountNo;
    #pin;
    #name;
    #balance;

    constructor(accountNo, pin, name, balance) {
        this.#accountNo = accountNo;
        this.#pin       = pin;
        this.#name      = name;
        this.#balance   = balance;
    }

    // Getters
    getAccountNo()  { return this.#accountNo; }
    getName()       { return this.#name; }
    getBalance()    { return this.#balance; }
    getAccountType(){ return "Bank Account"; }

    // Setters
    setName(name) { this.#name = name; }
    setPin(pin)   { this.#pin = pin; }

    // Validation
    validateAccount(enteredAccountNo) {
        return this.#accountNo === enteredAccountNo;
    }

    validatePin(enteredPin) {
        return this.#pin === enteredPin;
    }

    // Limit methods — overridden by subclasses
    getMaxWithdrawAmount() { return null; }
    getMaxWithdrawCount()  { return null; }

    // Operations
    deposit(amount) {
        this.#balance += amount;
    }

    withdraw(amount) {
        if (amount > this.#balance) return { success: false, reason: "Insufficient balance" };
        this.#balance -= amount;
        return { success: true };
    }
}


class SavingsAccount extends BankAccount {
    static MAX_WITHDRAW_AMOUNT = 10000;
    static MAX_WITHDRAW_COUNT  = 10;

    #withdrawCount = 0;

    constructor(accountNo, pin, name, balance) {
        super(accountNo, pin, name, balance);
    }

    getAccountType()       { return "Savings Account"; }
    getMaxWithdrawAmount() { return SavingsAccount.MAX_WITHDRAW_AMOUNT; }
    getMaxWithdrawCount()  { return SavingsAccount.MAX_WITHDRAW_COUNT; }

    withdraw(amount) {
        if (this.#withdrawCount >= SavingsAccount.MAX_WITHDRAW_COUNT) {
            return { success: false, reason: `Savings accounts are limited to ${SavingsAccount.MAX_WITHDRAW_COUNT} withdrawals per day` };
        }
        if (amount > SavingsAccount.MAX_WITHDRAW_AMOUNT) {
            return { success: false, reason: `Savings accounts cannot withdraw more than ₹${SavingsAccount.MAX_WITHDRAW_AMOUNT} per transaction` };
        }
        const result = super.withdraw(amount);
        if (result.success) this.#withdrawCount++;
        return result;
    }
}


class CurrentAccount extends BankAccount {
    static MAX_WITHDRAW_AMOUNT = 50000;
    static MAX_WITHDRAW_COUNT  = 5;

    #withdrawCount = 0;

    constructor(accountNo, pin, name, balance) {
        super(accountNo, pin, name, balance);
    }

    getAccountType()       { return "Current Account"; }
    getMaxWithdrawAmount() { return CurrentAccount.MAX_WITHDRAW_AMOUNT; }
    getMaxWithdrawCount()  { return CurrentAccount.MAX_WITHDRAW_COUNT; }

    withdraw(amount) {
        if (this.#withdrawCount >= CurrentAccount.MAX_WITHDRAW_COUNT) {
            return { success: false, reason: `Current accounts are limited to ${CurrentAccount.MAX_WITHDRAW_COUNT} withdrawals per day` };
        }
        if (amount > CurrentAccount.MAX_WITHDRAW_AMOUNT) {
            return { success: false, reason: `Current accounts cannot withdraw more than ₹${CurrentAccount.MAX_WITHDRAW_AMOUNT} per transaction` };
        }
        const result = super.withdraw(amount);
        if (result.success) this.#withdrawCount++;
        return result;
    }
}


class ATM {
    static bankName = "Akshaya Bank";
    static atmId    = "ATM-001";

    #cash;

    constructor(cash) {
        this.#cash = cash;
    }

    static getInfo() {
        return `${ATM.bankName} | ${ATM.atmId}`;
    }

    getCash() { return this.#cash; }

    dispenseCash(amount) {
        if (amount > this.#cash) return { success: false, reason: "ATM has insufficient cash" };
        this.#cash -= amount;
        return { success: true };
    }

    receiveCash(amount) {
        this.#cash += amount;
    }
}


const atm = new ATM(500000);

const users = [
    new SavingsAccount ("1001", "1234", "Akshaya", 5000),
    new CurrentAccount  ("1002", "5678", "Ravi",    12000),
    new SavingsAccount ("1003", "9999", "Priya",   8500),
    new CurrentAccount  ("1004", "4321", "Arjun",   7200),
    new SavingsAccount ("1005", "1111", "Meena",   3100),
    new CurrentAccount  ("1006", "2222", "Kiran",   9800),
    new SavingsAccount ("1007", "3333", "Divya",   15000),
    new CurrentAccount  ("1008", "4444", "Suresh",  6400),
    new SavingsAccount ("1009", "5555", "Nisha",   2750),
    new CurrentAccount  ("1010", "6666", "Vijay",   11300),
];
