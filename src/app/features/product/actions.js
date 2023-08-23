import * as product from './constants';

export const getAllProduct = (payload) => ({
    type: product.GET_ALL_PRODUCT,
    payload
})