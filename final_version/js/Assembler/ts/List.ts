export interface List<E> {
    add(object: E): void;                         
    add(index: number, object: E): void;           
    remove(index: number): boolean;           
    remove(object: E): boolean;               
    get(index: number): Object;               
    size(): Number;                           
    update(index: number, Object: E): void;   
}