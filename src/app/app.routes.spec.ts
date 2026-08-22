import { routes } from './app.routes';

describe('App routes', () => {
  it('should redirect the root path to home', () => {
    expect(routes[0]).toEqual(jasmine.objectContaining({
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }));
  });
});
