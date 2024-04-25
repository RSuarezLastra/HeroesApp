import { authReducer, types } from "../../../src/auth";

describe('Test en el authReducer', () => {


    test('debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false })

    });

    test('(login) debe llamar el login autenticar y establecer el usuario', () => {

        const action = {
            type: types.login,
            payload: {
                id: 1,
                name: 'raul'
            }
        }

        const state = authReducer({ logged: false}, action);

        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })

    });

    test('(logout) debe de borrar el name del usuario y logged en false', () => {

        const state = {
            logged: true,
            user: {
                id: 1,
                name: 'raul'
            }
        }

        const action = {
            type: types.logout,
        }

        const newstate = authReducer(state, action);

        expect( newstate ).toEqual({logged: false})

    });

})