import Home from '../pages/home'
import NotFound from '../pages/NotFound'
import Ui from '../pages/Ui'
import Ibutton from '../pages/Ui/button'
import Modals from '../pages/Ui/modals'
import ICarousel from '../pages/Ui/carousel'
import Gallery from '../pages/Ui/gallery'
import Loading from '../pages/Ui/loading'
import Message from '../pages/Ui/message'
import Notification from '../pages/Ui/notification'
import Tab from '../pages/Ui/tabs'
import RichText from '../pages/rich'
import Iform from '../pages/form'
import Login from '../pages/form/login'
import Register from '../pages/form/register'
import Tables from '../pages/table'
import High from '../pages/table/high'
import Basic from '../pages/table/basic'
import City from '../pages/city'
import Order from '../pages/order/index'
import User from '../pages/user'
import UserDetail from '../pages/user/detail'
import BikeMap from '../pages/map'
const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/ui',
        element: <Ui />,
        children: [
            {
                path: 'buttons',
                element: <Ibutton />
            },
            {
                path: 'modals',
                element: <Modals />
            },
            {
                path: 'loadings',
                element: <Loading />
            },
            {
                path: 'notification',
                element: <Notification />
            },
            {
                path: 'messages',
                element: <Message />
            },
            {
                path: 'tabs',
                element: <Tab />
            },
            {
                path: 'gallery',
                element: <Gallery />
            },
            {
                path: 'carousel',
                element: <ICarousel />
            }
        ]
    },
    {
      path:'/rich',
      element:<RichText/>
    },
    {
        path: '/form',
        element: <Iform />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'reg',
            element: <Register />
          }
        ]
      },
      {
        path: '/table',
        element: <Tables />,
        children: [
          {
            path: 'basic',
            element: <Basic />
          },
          {
            path: 'high',
            element: <High />
          }
        ]
      },
      {
        path: '/city',
        element: <City />
      },
      {
        path: '/detail',
        element: <Order />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path:'/user/detail/:id',
        element:<UserDetail/>
      },
      {
        path:'/bikeMap',
        element:<BikeMap/>
      },
    {
        path: '/*',
        element: <NotFound />
    }
]

export default routes 