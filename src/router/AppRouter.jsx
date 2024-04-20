import { Route, Routes, } from 'react-router-dom';
import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth';
import { PrivateRoutes, PublicRoute } from './';



export const AppRouter = () => {
    return (
        <>
            <Routes>

                <Route path='login' element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />

                <Route path='/*' element={
                    <PrivateRoutes>
                        <HeroesRoutes />
                    </PrivateRoutes>
                } />


            </Routes>
        </>
    )
}
