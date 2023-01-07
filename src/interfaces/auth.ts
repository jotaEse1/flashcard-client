export interface User {
    id: string;
    username: string;
    email: string;
    token: string;
}

export interface UserApp {
    isAuth: boolean,
    user: {
        id: string,
        username: string,
        email: string,
        token: string
    }
}

export interface SignInResponseSuccessful {
    success: true, 
    payload: {
        errors: {
            value: string,
            msg: string,
            param: string,
            location: string
        }[],
        status: 500
    } | {
        msg: string,
        status: 300
    } | {
        createdUser: {
            fieldCount: string,
			affectedRows: string,
			insertId: string,
			serverStatus: string,
			warningCount: string,
			message: string,
			protocol41: string,
			changedRows: string
        },
        status: 201 
    }
}

export interface SignInResponseUnsuccessful {
    success: false, 
    payload: {
        error: {}
    }
}

export interface LogInResponseSuccessful {
    success: true, 
    payload: {
        errors: {
            value: string,
            msg: string,
            param: string,
            location: string
        }[],
        status: 500
    } | {
        msg: string,
        status: 404
    } | {
        token: string, 
        id: string,
        username: string,
        email: string,
        status: 200
    }
}

export interface LogInResponseUnsuccessful {
    success: false, 
    payload: {
        error: {}
    }
}

export interface CheckTokenResponseSuccessful {
    success: true, 
    payload: {
        status: 404,
        msg: string
    } | {
        status: 200,
        user: User
    }
}

export interface CheckTokenResponseUnSuccessful {
    success: false, 
    payload: {
        error: {}
    }
}