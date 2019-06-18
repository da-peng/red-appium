"use strict"
//https://www.liaoxuefeng.com/wiki/1022910821149312/1056305537410240
import _  from "underscore" //underscore则提供了一套完善的函数式编程的接口，让我们更方便地在JavaScript中实现函数式编程。
import Q from "q" //https://blog.csdn.net/ii1245712564/article/details/51419533
//解决回调地狱的问题,并行，串行
/**
 * 看不太懂这个
 * @param {*} fn 
 */
let each =  (fn)=> {
    return  (els)=> {
        let seq = _(els).map( (el, i) => {
                return fn(el, i);
            }
        );
        // iterating
        return seq.reduce(Q.when, new Q()).then( ()=> {
            return els;
        });
    };
};

let filter =  (fn) =>{
    return  (els) =>{
        let seq = _(els).map( (el, i)=> {
            return (filteredEls)=> {
                return fn(el, i).then( (isOk)=> {
                    if (isOk) filteredEls.push(el);
                    return filteredEls;
                });
            };
        });
        // iterating
        return seq.reduce(Q.when, new Q([]));
    };
};

let printNames = each((el, i) => {
    return el.getAttribute('name').print(i + "--> ");
});

let filterDisplayed = filter((el) => {
    return el.isDisplayed();
});

let filterWithName = (name) => {
    return filter((el)=> {
        return el.getAttribute('name').then( (_name)=> {
            return _name === name;
        });
    });
};


module.exports (
    printNames,
    filterDisplayed,
    filterWithName
)