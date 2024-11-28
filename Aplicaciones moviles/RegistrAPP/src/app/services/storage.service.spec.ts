import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['create', 'set', 'get', 'remove', 'clear']);

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useValue: spy },
      ],
    });

    service = TestBed.inject(StorageService);
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;

   
    storageSpy.create.and.resolveTo(storageSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize storage', async () => {
    await service.init();
    expect(storageSpy.create).toHaveBeenCalled();
  });

  it('should set a value in storage', () => {
    service.set('key', 'value');
    expect(storageSpy.set).toHaveBeenCalledWith('key', 'value');
  });

  it('should get a value from storage', async () => {
    storageSpy.get.and.resolveTo('value');
    const result = await service.get('key');
    expect(storageSpy.get).toHaveBeenCalledWith('key');
    expect(result).toBe('value');
  });

  it('should remove a value from storage', () => {
    service.remove('key');
    expect(storageSpy.remove).toHaveBeenCalledWith('key');
  });

  it('should clear the storage', () => {
    service.clear();
    expect(storageSpy.clear).toHaveBeenCalled();
  });
});
