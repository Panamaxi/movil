import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: jasmine.SpyObj<Router>;
  let alertController: jasmine.SpyObj<AlertController>;
  let toastController: jasmine.SpyObj<ToastController>;
  let storageService: jasmine.SpyObj<StorageService>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    const toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['get', 'set', 'clear']);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['login', 'logout']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: ToastController, useValue: toastControllerSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to home', async () => {
    component.useApi = true;
    component.username = 'testUser';
    component.password = 'testPass';
    apiService.login.and.returnValue(of({ token: 'fakeToken' }));

  })})
