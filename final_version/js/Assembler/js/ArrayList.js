"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayList = void 0;
/**
 * ArrayList
 */
class ArrayList {
    constructor(initialCapacity) {
        // The array used to store the elements
        this.elementData = [];
        // The number of elements stored in the ArrayList
        this.sizeNum = 0;
        if (typeof initialCapacity === 'number') {
            //initialize the capacity of the ArrayList
            if (initialCapacity < 0) {
                throw new Error("is no arrayList index : " + initialCapacity);
            }
            this.elementData = new Array(initialCapacity);
        }
        else {
            //initialize the capacity of the ArrayList
            this.elementData = new Array(10);
        }
    }
    add(arg0, arg1) {
        if (typeof arg0 === 'number') {
            //索引添加
            this.ensureExplicitCapacity();
            this.rangeCheck(arg0);
            this.elementData.splice(arg0, 0, arg1);
            this.sizeNum++;
        }
        else {
            //普通添加,容量计算
            this.ensureExplicitCapacity();
            this.elementData[this.sizeNum] = arg0;
            this.sizeNum++;
        }
    }
    /**
     * TODO  通过下标查询对象
     * @param index 索引
     * @return Object
     */
    get(index) {
        this.rangeCheck(index);
        return this.elementData[index];
    }
    /**
     * TODO  更新数据
     * @param index 下标
     * @param 对象数据
     * @return void
     */
    update(index, Object) {
        this.rangeCheck(index);
        this.elementData[index] = Object;
    }
    remove(arg0) {
        if (typeof arg0 === 'number') {
            //删除指定下标数据
            this.elementData.splice(arg0, 1);
            this.sizeNum--;
            return true;
        }
        else {
            //删除具体数据,数据多不建议使用
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
     * TODO 获取集合长度
     * @return
     */
    size() {
        return this.sizeNum;
    }
    /**
     * TODO 检测数组是否下标越界，是抛出越界异常
     *
     * @param index
     */
    rangeCheck(index) {
        if (index >= this.sizeNum || index < 0) {
            throw new Error("is no index--->" + index);
        }
    }
    /**
     *  TODO 自动扩容 1.5X
     *  << : 左移运算符，num << 1, 相当于num乘以2
     *  >> : 右移运算符，num >> 1, 相当于num除以2
     */
    ensureExplicitCapacity() {
        if (this.elementData.length < this.sizeNum + 1) {
            // 当前集合实际容量
            let oldCapacity = this.elementData.length;
            //扩容1.5倍后的数
            let newCapacity = oldCapacity + (oldCapacity >> 1);
            //修改集合容量
            this.elementData.length = newCapacity;
            //console.log(this.elementData.length+"--> "+newCapacity + "--》"+this.elementData);
        }
    }
}
exports.ArrayList = ArrayList;
