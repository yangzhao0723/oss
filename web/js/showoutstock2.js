Ext.define('js.showoutstock2', {
    extend: 'Ext.panel.Panel',
    type: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": 1, "name": "正常出库"},
            {"abbr": 2, "name": "盘亏"},
            {"abbr": 3, "name": "报损"}

        ]
    }),
    initComponent: function () {
        var myopername = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/opernameselect',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['operName', 'operId'],
            autoLoad: true
        });
        var mymerchandise = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/merchanddiseselect',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['merchandiseName', 'merchandiseId','price'],
            autoLoad: true
        });
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore11');
                            if (context.field === "num") {
                                if (context.record.data.price) {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.num) {
                                    context.record.data.total = context.record.data.num * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if(context.field === 'name')
                            {
                                if((context.record.data.number)&&(context.record.data.price)){
                                    context.record.data.total = context.record.data.number * context.value;
                                }
                                myStore.remove(context.record);
                                myStore.insert(context.rowIdx, context.record);
                            }

                            if (context.record.data.name && context.record.data.num && context.record.data.price) {
                                myStore.add({});
                            }
                            me.totalmoney = 0;
                            for (var i = 0; i < myStore.data.items.length; i++) {
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "") {
                                    me.totalmoney += myStore.data.items[i].data.total;
                                }
                            }
                            Ext.getCmp('money').setValue(me.totalmoney);
                        }
                    }
                }
            }
        );
        Ext.apply(this, {
            title: '出库信息',
            id: 'showoutstock2',
            layout: 'anchor',
            closable: true,// 标题显示关闭按钮
            tbar: [
                {
                    text: '添加',
                    icon: "img/add.png",
                    cls: "x-btn-text-icon",
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('myStore11').data.items;
                        var postData = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'postData[' + index + '].meMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.name + '&postData[' + index + '].price=' + item.data.price + '&postData[' + index + '].num=' + item.data.num+'&postData[' + index + '].stockPrice=' + item.data.costprice;
                            if (index != mydata.length - 1) {
                                postData += '&';
                            }
                        });
                        Ext.getCmp('myFrom11').submit({
                            url: '/insertchuku?' + postData,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                if (msg.ishave) {
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: msg.message,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.MessageBox.YES
                                    });


                                    return;
                                }
                                Ext.MessageBox.show({
                                    title: '系统提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                            },
                            failure: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.MessageBox.show({
                                    title: '系统提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.QUESTION,
                                    buttons: Ext.MessageBox.YES
                                });
                            }


                        });
                    }
                }
            ],
            items: [
                {
                    xtype: 'form',
                    width: '100%',
                    id: 'myFrom11',
                    layout: {
                        type: 'table',
                        columns: 3
                    },
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 90,
                        labelAlign: 'right'

                    },
                    items: [
                        {
                            fieldLabel: '出库单号',
                            name: 'instock1.outBillCode'


                        },


                        {fieldLabel: '出库时间',
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            value: new Date(),
                            name: 'instock1.outTime'
                        },
                        {

                            fieldLabel: '经手人',
                            name: 'instock1.handler1'
                        }
                        ,

                        {xtype: 'combobox',
                            store: me.type,
                            fieldLabel: '入库方式',
                            name: 'instock1.outType',
                            allowBlank: false,
                            displayField: 'name',
                            valueField: 'abbr',
                            emptyText: '请选择...'
                        } ,

                        {
                            fieldLabel: '入库金额',
                            name: 'instock1.totalMoney',
                            id: 'money'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '操作员',
                            store: myopername,
                            queryMode: 'local',
                            emptyText: '请选择...',
                            displayField: 'operName',
                            valueField: 'operId',
                            name: 'instock1.auOperInfoByOperId.operId'
                        },
                        {
                            xtype: 'textarea',
                            width: 500,
                            height: 25,
                            fieldLabel: '备注',
                            colspan: 2,
                            name: 'instock1.remark'
                        }
                    ]
                },

                {
                    xtype: 'grid',
                    width: '100%',
                    plugins: [cellEditing],
                    id:'grid33',
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore11',
                        data: [
                            {}
                        ],
                        fields: [
                            'name', 'num', 'price', 'total','costprice'
                        ]
                    }),
                    columns: [
                        {
                            text: '商品',
                            editor: {
                                  xtype: 'combobox',
                                store: mymerchandise,
                                displayField: 'merchandiseName',
                                valueField: 'merchandiseId',
                                allowBlank: false,
                                listeners : {
                                    select : function(combo,record,index) {
                                        for(var a=0,b=combo.store.data.items.length;a<b;a++){
                                            if(combo.store.data.items[a].data.merchandiseId===combo.value){
                                                var goodprice=combo.store.data.items[a].data.price;
                                                Ext.Ajax.request({
                                                    url: '/kucunselect?kuncun.meMerchandiseInfoByMerchandiseId.merchandiseId='+combo.value,
                                                    async: false,
                                                    success: function (response) {

                                                        avgprice = Ext.JSON.decode(response.responseText)
                                                    }
                                                });

                                                var avgprice= avgprice.mes[0].avgPrice;
                                                var record11 = Ext.getCmp('grid33').getSelectionModel().getSelection()[0];
                                                record11.data.price = goodprice;
                                                record11.data.costprice=avgprice;
                                            }
                                        }
                                    }
                                }
                            },


                            dataIndex: 'name'
                        },

                        {
                            text: '数量',
                            editor: new Ext.form.field.Number({
                                maxValue: 99,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'num'
                        },
                        {
                            text: '售价',
                            editor:true,
                            dataIndex: 'price'
                        },
                        {
                            text: '总价',
                            dataIndex: 'total'
                        },
                        {
                            text:'平均价',
                            editor:true,
                            dataIndex:'costprice'
                        }
                    ]
                }
            ]

        });
        this.callParent();
    }
//    value1: function () {
//        Ext.Ajax.request({
//            url: 'unit',
//            reader: '',
//            root: '',
//            async: false,
//            success: function (response) {
//                mydata = Ext.JSON.decode(response.responseText);
//            }
//        });
//        return mydata;
//    }
});
