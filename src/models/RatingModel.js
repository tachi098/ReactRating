class RatingModel {
    constructor(
        name = "",
        comment = "",
        star = 1,
        phone = "",
        email = ""
    ){
        this.name = name;
        this.comment = comment;
        this.star = star;
        this.phone = phone;
        this.email = email
    }
}

export default new RatingModel();