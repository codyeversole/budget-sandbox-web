import { Observable } from "rxjs";

export interface DynamicCrudPanelClientBase<T> {
    save(item: T): Observable<void>;
    delete(id: number): Observable<void>;
}