import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate} from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () =>  mockedUseNavigate
}))

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: 1,
            name: 'jose madero'
        },
        logout: jest.fn()
    }

    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar el nombre del usuario', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText('jose madero')).toBeTruthy();

    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton de logout', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const btn = screen.getByRole('button');
        fireEvent.click(btn);

        expect( contextValue.logout).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {replace: true});
        


    })
})