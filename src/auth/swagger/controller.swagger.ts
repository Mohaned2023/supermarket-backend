import { swaggerInterface } from "src/interfaces/interfaces";
import { UserEntity } from "../entities/user.entity";


export const registerDoc: swaggerInterface = {
    operation: {
        summary: 'Create a new account.',
        description: 'Creating a new account in the system using username, displayName, password and accountType. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Created successfully.',
            type: UserEntity
        },
        badRequest: {
            description: 'The user is already exist.',
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to add users.',
        }
    }
}
export const loginDoc: swaggerInterface = {
    operation: {
        summary:'Login',
        description: 'Login to your account and getting the JWT token.'
    },
    responses: {
        success: {
            description: 'Login successfully and getting the JWT token.',
            example: { accessToken: 'Yor-Access-Token' }
        },
        notFound: {
            description: 'The username is not registered.'
        },
        badRequest: {
            description: 'Password is incorrect.'
        }
    }
}
export const updateDoc: swaggerInterface = {
    operation: {
        summary: 'Update user info.',
        description: 'Updating the user info by username. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Updated successfully.',
            type: UserEntity
        },
        badRequest: {
            description: '`Username is missing` or `Invalid update fields in the body`'
        },
        notFound: {
            description: 'The user not found.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to update the user inof.',
        }
    }
}
export const deleteDoc: swaggerInterface = {
    operation: {
        summary: 'Delete the user',
        description: 'Deleting the account of the user - `Role: admin`'
    },
    responses: {
        success: {
            description: 'The user deleted successfully.',
            example: { message: `User 'mohaned' has been deleted.` }
        },
        badRequest: {
            description: 'Username is missing.'
        },
        notFound: {
            description:'The user not found.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to delete the user.',
        }
    }
}