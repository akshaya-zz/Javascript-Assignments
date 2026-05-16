class User{
    static _count = 1;

    constructor(name, password, email, contact,address){
        this._id = User._count++;
        this._name = name;
        this._email = email;
        this._contact = contact;
        this._password = password;
        this._address = address;
    }
    get address(){
        return this._address;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get email(){
        return this._email;
    }
    get contact(){
        return this._contact;
    }
    get password(){
        return this._password;
    }
}

