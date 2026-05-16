const users = new Map([
    [1111, new User("Akshaya", "123456a", "aks@gmail.com", 1111, "12, Anna Nagar, Chennai - 600040")],
    [2222, new User("Ravi", "123456r", "ravi@gmail.com", 2222, "45, T. Nagar, Chennai - 600017")],
    [3333, new User("Priya", "priya@123", "priya@gmail.com", 3333, "8, Velachery Main Road, Chennai - 600042")],
    [4444, new User("Karthik", "karthik99", "karthik@gmail.com", 4444, "3, Nungambakkam High Road, Chennai - 600034")],
    [5555, new User("Meena", "meena@456", "meena@gmail.com", 5555, "22, OMR, Sholinganallur, Chennai - 600119")],
]);
const menuItems = new Map([
    [1, new MenuItem("Dosa", 110.00, "Breakfast")],
    [2, new MenuItem("Idli", 80.00, "Breakfast")],
    [3, new MenuItem("Poha", 70.00, "Breakfast")],
    [4, new MenuItem("Paneer Butter Masala", 220.00, "Lunch")],
    [5, new MenuItem("Dal Tadka", 150.00, "Lunch")],
    [6, new MenuItem("Veg Biryani", 180.00, "Lunch")],
    [7, new MenuItem("Masala Chai", 40.00, "Beverages")],
    [8, new MenuItem("Fresh Lime Soda", 60.00, "Beverages")],
    [9, new SpecialItem("Truffle Mushroom Risotto", 450.00, "Dinner", "Rajan")],
    [10, new SpecialItem("Saffron Chicken Korma", 520.00, "Dinner", "Meera")],
    [11, new SpecialItem("Mango Basil Cheesecake", 300.00, "Desserts", "Arjun")],
]);
