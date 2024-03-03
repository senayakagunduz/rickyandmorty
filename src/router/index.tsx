import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CommonLayout from '../layouts/CommonLayout'
import FavoritesPage from '../pages/FavoritesPage'
import CharacterListPage from '../pages/CharacterListPage'
import CharacterDetailPage from '../pages/CharacterDetailPage'
import LocationPage from '../pages/LocationPage'
import LocationsCharacters from '../pages/LocationsCharacters'

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <LocationPage />
      },
      {
        path: "favorites",
        element: <FavoritesPage />
      },
      {
        path: "character",
        children: [
          {
            index: true,
            element: <CharacterListPage />
          },
          {
            path: ":id",
            element: <CharacterDetailPage />
          }
        ]
      },
      {
        path: "location",
        children: [
          {
            index: true,
            element: <LocationPage />
          },
          {
            path: ":id",
            element: <LocationsCharacters />
          },
        ]
      },
    ]
  }
])


export default function AppRouter() {
  return <RouterProvider router={router} />
}