Ext.define('js.showinstock1', {
    extend: 'Ext.panel.Panel',
    type: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": 1, "name": "正常入库"},
            {"abbr": 2, "name": "报溢"},
            {"abbr": 3, "name": "盘盈"}

        ]
    }),
    initComponent: function () {
        var myghs = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/ghs',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['supplierName', 'supplierId'],
            autoLoad: true
        });
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
            fields: ['merchandiseName', 'merchandiseId'],
            autoLoad: true
        });
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore8');
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
            title: '采购信息',
            id: 'showinstock1',
            layout: 'anchor',
            closable: true,// 标题显示关闭按钮
            tbar: [
                {
                    text: '添加',
                    icon: "img/add.png",
                    cls: "x-btn-text-icon",
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('myStore8').data.items;
                        var postData = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'postData[' + index + '].meMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.name + '&postData[' + index + '].price=' + item.data.price + '&postData[' + index + '].num=' + item.data.num;
                            if (index != mydata.length - 1) {
                                postData += '&';
                            }
                        });
                        Ext.getCmp('myFrom8').submit({
                            url: '/insertaa?' + postData,
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
                    id: 'myFrom8',
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
                            fieldLabel: '进货单号',
                            name: 'instock1.billCode'
//                            readOnly:true,
//                            value:me.value1()

                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '供应商',
                            store: myghs,
                            queryMode: 'local',
                            emptyText: '请选择...',
                            displayField: 'supplierName',
                            valueField: 'supplierId',
                            name: 'instock1.baSupplierInfoBySupplierId.supplierId'
                        },

                        {fieldLabel: '入库时间',
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            value: new Date(),
                            name: 'instock1.inTime'
                        },
                        {

                            fieldLabel: '经手人',
                            name: 'instock1.handler1'
                        }
                        ,

                        {xtype: 'combobox',
                            store: me.type,
                            fieldLabel: '入库方式',
                            name: 'instock1.inType',
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
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore8',
                        data: [
                            {}
                        ],
                        fields: [
                            'name', 'num', 'price', 'total'
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
                                allowBlank: false
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
                            text: '价格',

                            editor: new Ext.form.field.Number({
                                maxValue: 99,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'price'
                        },
                        {
                            text: '总价',
                            dataIndex: 'total'
                        }
                    ]
                }
            ]

        });
        this.callParent();
    },
    value1: function () {
        Ext.Ajax.request({
            url: 'unit',
            reader: '',
            root: '',
            async: false,
            success: function (response) {
                mydata = Ext.JSON.decode(response.responseText);
            }
        });
        return mydata;
    }
//    tb:function(){
//
//        Ext.create('Ext.window.Window', {
//            title: '添加数据',
//            width: 500,
//            height: 175,
//            layout: 'fit',
//            id : "",
//            items: [
//                {
//                    xtype: 'form',
//                    layout: 'form',
//                    defaults: {
//                        xtype: 'textfield'
//                    },
//                    items: [
//                        {
//                            fieldLabel: '商品',
//                            name: 'unit.name'
//                        },
//                        {
//                            fieldLabel: '数量',
//                            name: 'unit.status'
//                        },
//
//                        {
//                            fieldLabel: '价格',
//                            name: 'unit.remark'
//                        },
//                        {
//                            fieldLabel: '总价',
//                            name: 'unit.remark'
//                        }
//
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '添加'},
//                { text: '重置' , handler: function () { this.up('window').down('form').getForm().reset();} }
//            ]
//
//        }).show();
//    }
});
