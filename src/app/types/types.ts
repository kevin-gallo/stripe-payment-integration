export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    company: string;
}

export interface ProductCardProps {
    products: Product[];
    cart: number[];
    handleAddToCart: (id: number) => void;
}

export interface ReviewCartProps {
    cartProducts: Product[];
    handleCheckout: () => void;
}