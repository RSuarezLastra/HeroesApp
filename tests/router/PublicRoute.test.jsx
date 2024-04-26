import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";

describe('Pruebas en <PublicRoute /> ', () => {

    test('debe de mostrar el children si no esta autenticado', () => {

        const contextValue = { logged: false }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta Publica')).toBeTruthy();
    })

    test('debe navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'raul'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={ <h1>Pagina Marvel</h1> }/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
    })


})