import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePage } from './create.page';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('CreatePage', () => {
  let component: CreatePage;
  let fixture: ComponentFixture<CreatePage>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear mocks para ApiService y Router
    const apiServiceMock = jasmine.createSpyObj('ApiService', ['createPost']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreatePage],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial state', () => {
    expect(component.title).toBe('');
    expect(component.body).toBe('');
    expect(component.qrData).toBe('');
  });

  it('should create a post successfully and navigate to home', () => {
    // Simular que la API responde correctamente
    const mockResponse = { id: 1, title: 'Test Title', content: 'Test Content' };
    apiService.createPost.and.returnValue(of(mockResponse));

  
    component.title = 'Test Title';
    component.body = 'Test Content';

   
    component.createPost();

    
    expect(apiService.createPost).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content',
    });

    // Verificar que se generaron los datos del QR correctamente
    expect(component.qrData).toBe('Título: Test Title\nContenido: Test Content');

    
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle API error when creating a post', () => {
    // Simular que la API responde con un error
    const mockError = { message: 'Error al crear el post' };
    apiService.createPost.and.returnValue(throwError(mockError));

    // Establecer valores para title y body
    component.title = 'Test Title';
    component.body = 'Test Content';

   
    spyOn(console, 'error');

   
    component.createPost();

    expect(apiService.createPost).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content',
    });

    
    expect(console.error).toHaveBeenCalledWith('Error al crear el post', mockError);

   
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
