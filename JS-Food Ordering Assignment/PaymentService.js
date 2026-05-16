class PaymentService{
    static processPayment(finalAmount){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("done");
            }, 3000);
        });
    }
}
