
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue')
  }, {
    path: '/emisores',
    component: () => import('layouts/SedesLayout.vue')
  }, {
    path: '/viewqrinvoice/:qrinvoice',
    component: () => import('layouts/ViewInvoiceqrLayout.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/Index.vue') },
      { path: '/usuarios', component: () => import('pages/Usuarios.vue') },
      { path: '/sedes', component: () => import('pages/Sedes.vue') },
      { path: '/simulador', component: () => import('pages/Simulador.vue') },
      { path: '/simulador2', component: () => import('pages/Simulador2.vue') },
      { path: '/simuladorAsignacion', component: () => import('pages/SimuladorAsignacion.vue') },
      { path: '/tranzasAsignacion', component: () => import('pages/TranzasAsignacion.vue') },
      { path: '/consulta', component: () => import('pages/Consulta.vue') },
      { path: '/auditorias', component: () => import('pages/Bitacoras.vue') },
      { path: '/informes', component: () => import('pages/Informe/Informe.page.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
