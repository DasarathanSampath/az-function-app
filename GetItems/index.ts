import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import itemsService from "../services/itemsService";

const httpTrigger: AzureFunction = async function (
    context: Context, 
    req: HttpRequest
): Promise<void> {
    let response;
    try {
        let products = await itemsService.read();
        response = { body: products, status: 200 };
    } catch (err) {
        response = { body: err.message, status: 500 };
    }

    context.res = response;

};

export default httpTrigger;