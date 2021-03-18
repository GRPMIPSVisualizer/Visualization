import {List} from "./List";
export class ArrayList<E> implements List<E> {

    /**
     * The array used to store the elements.
     */
    elementData: Object[] = [];

    /**
     * The number of elements stored in the ArrayList.
     */
    sizeNum: number = 0;


    /**
     * Constructor for ArrayList
     * @param null | initialCapacity
     * @returns void
     */
    constructor()
    constructor(initialCapacity: number)
    constructor(initialCapacity?: any) {
        if (typeof initialCapacity === 'number') {
            if (initialCapacity < 0) {
                throw new Error("is no arrayList index : " + initialCapacity);
            }
            this.elementData = new Array<Object>(initialCapacity);
        } else {
            this.elementData = new Array<Object>(10);
        }
    }

    /**
     * Add an element to ArrayList.
     * @param arg0 If there is only one argument, arg0 is the object to be added. If there are
     * two arguments, arg0 is the index at which the specified object is to be added.
     * @param arg1 If there are two arguments, arg1 is the object to be added.
     * @returns void
     */
    add(object: E): void
    add(index: number, object: E): void
    add(arg0?: any, arg1?: any): void {
        if (typeof arg0 === 'number') {
            this.ensureExplicitCapacity();
            this.rangeCheck(arg0);
            this.elementData.splice(arg0, 0, arg1);
            this.sizeNum++;
        } else {
            this.ensureExplicitCapacity();
            this.elementData[this.sizeNum] = arg0;
            this.sizeNum++;
        }
    }


    /**
     * Get the object specified by the index
     * @param index 
     * @returns Object
     */
    get(index: number): Object {
        this.rangeCheck(index);
        return this.elementData[index];
    }


    /**
     * Update the object at the specified index
     * @param index 
     * @param Object
     * @returns void
     */
    update(index: number, Object: E): void {
        this.rangeCheck(index);
        this.elementData[index] = Object;
    }


    /**
     * Remove the specified object
     * @param arg0 the object to be removed or the index at which the object is to be removed
     * @returns true if the object is removed successfully, otherwise false
     */
    remove(object: E): boolean;
    remove(index: number): boolean;
    remove(arg0: number | E): boolean {
        if (typeof arg0 === 'number') {
            this.elementData.splice(arg0, 1);
            this.sizeNum--;
            return true;
        } else {
            let result = false;
            for (let i = 0; i < this.sizeNum; i++) {
                if (this.get(i) === arg0) {
                    result = this.remove(i);
                }
            }
            if (result == false) {
                console.log("is no object?");
            }
            return result;
        }
    }

    /**
     * Clear all elements in the ArrayList.
     * @returns void
     */
    clear(): void {
        for (let i = 0; i < this.sizeNum; i++) {
            this.remove(i);
        }
    }

    /**
     * Get the size of the ArrayList
     * @returns the size of the ArrayList
     */
    public size(): number {
        return this.sizeNum;
    }

    /**
     * Check whether the index exceeds the capacity
     * @param index
     * @returns void
     */
    private rangeCheck(index: number): void {
        if (index >= this.sizeNum || index < 0) {
            throw new Error("is no index--->" + index);
        }
    }


    /**
     *  Expand the capacity of the ArrayList to 1.5 times
     * @returns void
     */
    public ensureExplicitCapacity(): void {
        if (this.elementData.length < this.sizeNum + 1) {
            let oldCapacity: number = this.elementData.length;
            let newCapacity: number = oldCapacity + (oldCapacity >> 1);
            this.elementData.length = newCapacity;
        }
    }
}

