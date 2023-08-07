class PageRenderer {
    getErrorPage(errorObject) {
        return `<div class='d-flex align-items-center justify-content-center vh-100'> 
                    <div class='text-center'>
                    <h1 class='display-1 fw-bold'>${errorObject.status}</h1> 
                    <p class='fs-3'> <span class='text-danger'>Opps!</span>${errorObject.message}</p>
                    <p class='lead'>${errorObject.description}</p>
                    <a href='/' class='btn btn-primary'>Go Home</a>
                    </div>
                </div>`;
    }

    getErrorObject(errorCode){
        switch(errorCode){
            case '404':
                return {status: 404, message: "Page not found", description: "The page you're looking for doesn't exist"};
            case '408':
                return {status: 408, message: "Request Timeout", description: "The request took too long to process."};
            case '409':
                return {status: 409, message: "Conflict", description: "The request could not be completed due to a conflict with the current state of the target resource."};
            case '500':
                return {status: 500, message: "Internal Server Error", description: "An internal server error occurred."};
            case '503':
                return {status: 503, message: "Service Unavailable", description: "The service is temporarily unavailable."};
            default:
                return null;
        }
    }
}

module.exports = PageRenderer;