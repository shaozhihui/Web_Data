### Js及Grid随笔



#### JS相关知识：https://www.w3cschool.cn/jsref/dom-obj-canvas.html

#### Array 对象方法

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [concat()](https://www.w3cschool.cn/jsref/jsref-concat-array.html) | 连接两个或更多的数组，并返回结果。                           |
| [every()](https://www.w3cschool.cn/jsref/jsref-every.html)   | 检测数组元素的每个元素是否都符合条件。                       |
| [filter()](https://www.w3cschool.cn/jsref/jsref-filter.html) | 检测数组元素，并返回符合条件所有元素的数组。                 |
| [indexOf()](https://www.w3cschool.cn/jsref/jsref-indexof-array.html) | 搜索数组中的元素，并返回它所在的位置。                       |
| [join()](https://www.w3cschool.cn/jsref/jsref-join.html)     | 把数组的所有元素放入一个字符串。                             |
| [lastIndexOf()](https://www.w3cschool.cn/jsref/jsref-lastindexof-array.html) | 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。 |
| [map()](https://www.w3cschool.cn/jsref/jsref-map.html)       | 通过指定函数处理数组的每个元素，并返回处理后的数组。         |
| [pop()](https://www.w3cschool.cn/jsref/jsref-pop.html)       | 删除数组的最后一个元素并返回删除的元素。                     |
| [push()](https://www.w3cschool.cn/jsref/jsref-push.html)     | 向数组的末尾添加一个或更多元素，并返回新的长度。             |
| [reverse()](https://www.w3cschool.cn/jsref/jsref-reverse.html) | 反转数组的元素顺序。                                         |
| [shift()](https://www.w3cschool.cn/jsref/jsref-shift.html)   | 删除数组的第一个元素。                                       |
| [slice()](https://www.w3cschool.cn/jsref/jsref-slice-array.html) | 选取数组的的一部分，并返回一个新数组。                       |
| [some()](https://www.w3cschool.cn/jsref/jsref-some.html)     | 检测数组元素中是否有元素符合指定条件。                       |
| [sort()](https://www.w3cschool.cn/jsref/jsref-sort.html)     | 对数组的元素进行排序。                                       |
| [splice()](https://www.w3cschool.cn/jsref/jsref-splice.html) | 从数组中添加或删除元素。                                     |
| [toString()](https://www.w3cschool.cn/jsref/jsref-tostring-array.html) | 把数组转换为字符串，并返回结果。                             |
| [unshift()](https://www.w3cschool.cn/jsref/jsref-unshift.html) | 向数组的开头添加一个或更多元素，并返回新的长度。             |
| [valueOf()](https://www.w3cschool.cn/jsref/jsref-valueof-array.html) | 返回数组对象的原始值。                                       |



**Grid**：一种类似于flex 的布局方式，与弹性不同，为栅格式布局。

#### 容器用法及属性： 

**display：grid** ：将该盒子设置为grid栅格盒子。

**Grid-template-rows**: 用于设置行，第一个值为行的数量，后续为对应行高。

**Grid-template-columns**: 用于设置列，与行相似。

**Grid-template-columns/rows :repeat(5,20%)**  绘制五  列/行 ，每个  列/行  对应宽度或高度为20%。repeat方法的本意为重复五次，每次绘制20%，也可以做其他操作，如repeat（3,1fr 2fr 1fr）会重复三次，每次三个分别为 1fr 2fr 1fr的格子，总共9个格子。

**Grid-template-columns/rows :repeat(auto-fill,100px)** ：auto-fill， 根据后面的大小平分整个容器。

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

**Grid-auto-flow：colum； ** : 改为先列后行的排序，默认为先行后列。

**Grid-auto-flow：row/colum  dense；** ：如果前面设置占位多的格子间有空隙，该属性则可以将容器内的格子按 先  行/列  后   列/行  的顺序摆放，并尽量紧密填满，不留空隙。

**justify-items** 属性和**align-items** 属性：justify设置的是格子内部内容的水平位置，align设置的是格子内部内容的垂直位置。

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

**place-items**属性是**align-items**属性和**justify-items**属性的合并简写形式。

**place-items**: <align-items>  <justify-items>;

**justify-content** 属性， **align-content** 属性：设置的是格子没铺满时在容器内的位置。同理水平和垂直。

- start：对齐容器的起始边缘。
- end：对齐容器的结束边缘。
- center：容器内部居中。
- stretch： 格子大小没有指定时，拉伸占据整个网格容器。
- space-around ： 每个格子两侧的间隔相等。所以，格子之间的间隔比项目与容器边框的间隔大一倍。
- space-between ： 格子与格子的间隔相等，格子与容器边框之间没有间隔。
- space-evenly ： 格子与格子的间隔相等，格子与容器边框之间也是同样长度的间隔。

**place-content**: <align-content>  <justify-content>;

**grid-auto-rows/colum: 50px;** :用来设置，浏览器自动创建的多余网格的列宽和行高。如果有超出容器的格子，那这些超出的格子由该属性设置行列高。



```css
grid-template属性是grid-template-columns、grid-template-rows和grid-template-area这三个属性的合并简写形式。

grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。

为了代码的可读性，不建议写合并属性。
```



#### 容器内的单元格属性：

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

**grid-column-start**属性：左边框所在的垂直网格线， 值 1   意为第一个水平网格线。

**grid-column-end**属性：右边框所在的垂直网格线。值 span 2，从该单元格开始垂直填充两格。

**grid-row-start**属性：上边框所在的水平网格线。

**grid-row-end**属性：下边框所在的水平网格线。

以上为选择格子的占区域，值为所对应的网格线。也可以用 span 加 2，意为包括单元格自身在内填充两格。如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

**grid-column/row:**属性是grid-column/row-start和grid-column/row-end的合并简写形式。

grid-column: <start-line> / <end-line>;

**grid-area：**属性指定项目放在哪一个区域。





