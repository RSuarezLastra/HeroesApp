import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from '../../src/router/PrivateRoutes'
import { AuthContext } from "../../src/auth";

describe('Pruebas en <PrivateRoute /> ', () => {

    test('debe de mostrar el children si no esta autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'raul'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoutes>
                        <h1>Ruta Privada</h1>
                    </PrivateRoutes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/marvel')
    })
})