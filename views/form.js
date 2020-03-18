const  userDb = require('../sequelize/user');
const  classDb = require('../sequelize/class');
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');
// classDb.sync();
class UserApi {
    constructor()
    {
        this._list = [];
        this._hash = {};
        this.childList = [];
    }
    update($Obj)
    {
        for(var item of $Obj)
        {
            this.add(item);
        }
    }
    add($item)
    {
        if(!this._hash[$item.id])
        {
            this._hash[$item.id] = $item;
        }
        this._list.push($item);
    }
    async print(ctx) {
        // let htmlPath = path.join(__dirname, '../', '/public/html/index.html');
        // let files = fs.readFileSync(htmlPath);
        // let pdf = new pdfkit();
        //
        // var text = 'What you wanna write to the pdf document.';
        // pdf.pipe(fs.createWriteStream('Aim.pdf'));
        // pdf.text(files,50,10);
        // pdf.end();
        // html2canvas(files.body).then(function(canvas) {
        let arr1  = [1,2,3,4,6,5];
        // ctx.body = selectionSort(arr1);
        // });
        arr1.splice(1,1);
        var list = await  userDb.findAll();
        this.update(list);
        ctx.body = this._hash;
    }
    async getQrCode(ctx)
    {
        ctx.body = this._hash;
    }
    async getForm(ctx)
    {
        let id = ctx.request.query.id || null;
        if(this._hash[id])
        {
            console.log('-----缓存------');
            ctx.body =  this._hash[id];
        }
        else
        {
            //再去查数据库
            ctx.body =  1;
        }
    }
}
/*
 * 冒泡排序
 * */
function bubbleSort (arr)
{

    var i = arr.length;
    console.log(i,"-------------");
    let index = 0;
    while (i > 0)
    {
        var pos = 0;
        for (var j = 0; j < i; j++)
        {
            if (arr[j] > arr[j+1])
            {
                pos = j;
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp
            }
            ++index
        }
        i = pos
    }
    console.log(index);
    return arr
}
/*
 * 选择排序
 * */
function selectionSort (arr)
{
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len-1; i++)
    {
        minIndex = i;
        for (var j = i+1; j < len; j++)
        {
            if (arr[j] < arr[minIndex])
            {
                minIndex = j
            }
        }
        temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp
    }
    return arr
}

/*
 * 插入排序
 * */
function insertSort (arr)
{
    var len = arr.length;
    for (i = 1; i < len; i++)
    {
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key
    }
    return arr
}
/**
 * 获取根节点的所有 叶子节点 个数
 * @param {Object} json Object 对象
 */
function getLeafCountTree(json)
{
    if(!json.children)
    {
        return 1;
    }
    else
    {
        let leafCount = 0;
        for(let i = 0 ; i < json.children.length ; i++)
        {
            // leafCount = leafCount + getLeafCountTree(json.children[i]);
            leafCount = leafCount + arguments.callee(json.children[i]);
        }
        return leafCount;
    }
}
module.exports = UserApi;
