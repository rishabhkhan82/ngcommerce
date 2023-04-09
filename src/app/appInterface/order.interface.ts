export interface orderInterface {
    products : [
        {
            productimage : string,
            title : string,
            price : number,
            category : string,
            hasdiscount : {},
            discoujntpercentage : number,
            size : [],
            desone : string,
            destwo : string,
            desthree : string,
            desfour : string,
            quantity : number,
            productId : string,
            userEmail: string,
            userId: string,
            cartId ?: string
        }
    ],
    address: string,
    orderPrice : string,
    userId: string,
    status: string,
    date: string
}