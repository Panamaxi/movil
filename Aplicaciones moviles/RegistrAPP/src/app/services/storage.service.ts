import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Obtener datos
  public async get(key: string) {
    return await this._storage?.get(key);
  }

  // Eliminar un item específico
  public remove(key: string) {
    this._storage?.remove(key);
  }

  // Limpiar todo el storage
  public clear() {
    this._storage?.clear();
  }
}
