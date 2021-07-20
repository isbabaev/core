import { Product } from "../../product";
import { datatype, commerce, image, finance } from 'faker';
import { createAccount } from "./account.factory";
import { Id } from "../../../../domains/value-objects/id";
import { ProductName } from "../../../../domains/value-objects/product/product-name";
import { ProductDescription } from "../../../../domains/value-objects/product/product-description";
import { ProductPhotoUri } from "../../../../domains/value-objects/product/product-photo-uri";
import { Price } from "../../../../domains/value-objects/price";
import BigNumber from "bignumber.js";
import { Currency } from "../../../../domains/value-objects/currency";

export function createProduct(): Product {
    const account = createAccount();
    return new Product(
        new Id(datatype.uuid()),
        new ProductName(commerce.productName()),
        new ProductDescription(commerce.productDescription()),
        [new ProductPhotoUri(image.imageUrl())],
        new Price(new BigNumber(finance.amount()), new Currency('dollar')),
        account,
        account,
    );
}