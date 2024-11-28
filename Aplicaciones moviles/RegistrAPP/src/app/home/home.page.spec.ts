import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { ApiService } from '../services/api.service';
import * as QRCode from 'qrcode'; // Importar la biblioteca QRCode
import { of, throwError } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceMock = jasmine.createSpyObj('ApiService', ['getPosts']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    fixture.detectChanges();
  });

  it('should generate QR code on ngOnInit', async () => {
    // Mock explícito de QRCode.toDataURL
    spyOn(QRCode, 'toDataURL').and.callFake(() => Promise.resolve('mockQRCodeURL'));
  
    await component.generateQRCode();
    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      'Alumno: Nara, Asignatura: Programación Móvil',
      { errorCorrectionLevel: 'M', width: 256 },
      jasmine.any(Function) // Indica que se espera un tercer argumento que sea una función
    );
    expect(component.qrCodeData).toBe('mockQRCodeURL');
  });
  
  it('should log error when QR code generation fails', async () => {
    const mockError = new Error('QR generation error');
    spyOn(QRCode, 'toDataURL').and.callFake(() => Promise.reject(mockError));
    spyOn(console, 'error');
  
    await component.generateQRCode();
  

    expect(console.error).toHaveBeenCalledWith('Error generando el código QR:', mockError);
  });
});
