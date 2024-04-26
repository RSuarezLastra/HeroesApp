import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router";

describe('Pruebas en <AppRouter />', () => {

    test('debe de mostrar el login si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Login')).toBeTruthy();

    });

    test('debe de mostrar el componente si esta esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'raul'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        
        expect(screen.getByText('MarvelPage')).toBeTruthy();
    })
})