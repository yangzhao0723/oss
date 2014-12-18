
Ext.define('js.showinstock', {
    extend: 'Ext.grid.Panel',

    initComponent: function () {
        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'storid',
            autoLoad: false,
            fields: ['billCode', 'inType','baSupplierInfoBySupplierId.supplierName','inTime','handler1','totalMoney','auOperInfoByOperId.operName','remark','id',{name: 'baSupplierInfoBySupplierId.supplierId', type:'string'},{name:'auOperInfoByOperId.operId',type:'string'}],
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: '/instockselect',
                reader: {
                    type: 'json',
                    root: 'mes',
                    totalProperty: 'count'
                }
            }
        });
        var tiaojian = Ext.create('Ext.data.Store',{
            fields:['name','chaxunname'],
            data:[
                {'name':'billCode','chaxunname':'入库单号'},
                {'name':'handler1','chaxunname':'经手人'},
                {'name':'auOperInfoByOperId.operName','chaxunname':'操作员'}

            ]
        });
        ss.load({
            params: {
                start: 0,
                limit: 5
            }
        });

        Ext.apply(this, {
            //grid模板
            title: '采购明细信息',
            closable:true,
            store: ss,
            id: 'showinstock',
            tbar: [
                {   xtype: 'button',
                    text: '明细查询',
                    icon: "img/select.png",
                    handler: function () {
                        me.show1();
                    }
                },
                {
                    xtype: 'button',
                    text: '删除',
                    icon: "img/delete.png",
                    handler: function () {
                        me.delete();
                    }

                },

                {
                    xtype: 'button',
                    text: '刷新',
                    icon: "img/shuaxin.png",
                    handler: function () {
                        Ext.getCmp('showinstock').store.reload();
                    }

                },
                {
                    xtype:'combo',
                    fieldLabel:'查询条件',
                    name:'chaxuncode',
                    id:'szid',
                    displayField:'chaxunname',
                    valueField:'name',
                    store:tiaojian
                },
                {
                    xtype:'textfield',
                    id:'getidrukudan',
                    name:'code'
                },
                {   xtype: 'button',
                    text: '查询',
                    icon: "img/select.png",
                    cls: "x-btn-text-icon",
                    handler:function(){
                        Ext.getCmp('showinstock').store.load({
                            params:{
                                chaxuncode:Ext.getCmp("szid").getValue(),
                                code:Ext.getCmp('getidrukudan').getValue()
                            }
                        })
                    }
                }

            ],
            columns: [
                {dataIndex: 'billCode', text: '入库单号'
                },

                {dataIndex: 'baSupplierInfoBySupplierId.supplierName', text: '供应商'
                },
                {dataIndex: 'inTime', text: '入库时间'
                } ,
                {
                    dataIndex:'handler1'  ,text:'经手人'
                },
                {
                    dataIndex: 'auOperInfoByOperId.operName', text: '操作员'
                },
                {
                    dataIndex: 'remark', text: '备注'
                },
                {
                    dataIndex: 'inType', text: '入库方式'
                },{
                    dataIndex: 'totalMoney', text: '总价'
                }

            ],
            width: 800,
            height:800,
            //分页的控件
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: ss,
                    dock: 'bottom',
                    displayInfo: true,
                    emptyMsg: "No topics to display"
                }
            ]

        });
        this.callParent();
    },
   show1:function() {
       var me = this;
       var record1 = Ext.getCmp("showinstock").getSelectionModel().getSelection()[0];
       var aa1 = Ext.create('Ext.data.Store', {
           id: 'storid1',
           pageSize: 2,
           proxy: {
               type: 'ajax',
               url: '/select1.action?merchandise1.meInStockInfoByBillCode.billCode=' + record1.get('billCode'),
               reader: {
                   type: 'json',
                   root: 'mes',
                   totalProperty: 'count'
               }
           },
           fields: [
              'meInStockInfoByBillCode.billCode','meMerchandiseInfoByMerchandiseId.merchandiseName','meMerchandiseInfoByMerchandiseId.merchandiseId','num','price'


           ],
           autoLoad: true
       });
       aa1.load({
               params: {
                   start: 0,
                   limit: 2
               }
           });
       Ext.create('Ext.window.Window', {

           title: '详细信息',
           width: 580,
           height: 350,
           layout: 'fit',
           buttons:[{text:'编辑',
               handler: function () {
                   me.update(me);
               }
           }],
           items: [
               {
                   xtype: 'grid',
                   id: 'grid2',
                   store: aa1,
                   columns: [
                       {text: '商品单号', dataIndex: 'meMerchandiseInfoByMerchandiseId.merchandiseId'},
                       {text: '商品名称', dataIndex: 'meMerchandiseInfoByMerchandiseId.merchandiseName'},
                       {text: '入库数量', dataIndex: 'num',id:'dangenum'},
                       {text: '进价', dataIndex: 'price',id:'dangeprice'},
                       { text:'订单号',dataIndex:'meInStockInfoByBillCode.billCode' }

                 ]
               }

           ],
           dockedItems: [{
               xtype: 'pagingtoolbar',
               store: aa1,
               dock: 'bottom',
               displayInfo: true
           }]

       }).show();
   },
    delete:function(){
        var record= Ext.getCmp("showinstock").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'deteleaa?instock1.billCode=' + record.get('billCode'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.panduan) {
                                Ext.getCmp('showinstock').store.reload();
                            }
                        }
                    });
                }
            }
        });
    },

    update:function(a){
        var type= Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": 1, "name": "正常入库"},
                {"abbr": 2, "name": "报溢"},
                {"abbr": 3, "name": "盘盈"}

            ]
        });
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
        var record = Ext.getCmp("showinstock").getSelectionModel().getSelection()[0];
        var record1 = Ext.getCmp("grid2").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window', {
            title: '商品入库及明细表',
            width: 350,
            height: 500,
            layout: 'fit',
            id:'instockbianji',
            items:[
                {
                    xtype:'form',
                    layout:'border',
                    items:[
                        {
                            title:'入库信息',
                            region: 'north',
                            border: false,
                            height: 260,
                            defaults: {
                                xtype: 'textfield'
                            },


                            items: [
                                {fieldLabel: '入库单号',  name: 'instock1.billCode', value: record.get('billCode') },

                                {
                                    xtype: 'combobox',
                                    fieldLabel: '供应商',
                                    store: myghs,
                                    queryMode: 'local',
                                    value: record.raw.baSupplierInfoBySupplierId.supplierId,
                                    displayField: 'supplierName',
                                    valueField: 'supplierId',
                                    name: 'instock1.baSupplierInfoBySupplierId.supplierId'
                                },
                                {fieldLabel: '入库时间',  name: 'instock1.inTime', value: record.get('inTime') },
                                {fieldLabel: '经手人',  name: 'instock1.handler1', value: record.get('handler1') },
//
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '操作员',
                                    store: myopername,
                                    queryMode: 'local',
                                    value: record.raw.auOperInfoByOperId.operId,
                                    displayField: 'operName',
                                    valueField: 'operId',
                                    name: 'instock1.auOperInfoByOperId.operId'
                                },
                                {fieldLabel: '备注',    name: 'instock1.remark', value: record.get('remark') },
                                {xtype: 'combobox',
                                    store: type,
                                    fieldLabel: '入库方式',
                                    name: 'instock1.inType',
                                    allowBlank: false,
                                    displayField: 'name',
                                    valueField: 'abbr',
                                    value: record.raw.inType
                                },
                                {fieldLabel: 'id',  name: 'instock1.id', value: record.get('id') ,hidden:true},
                                {fieldLabel: '入库',  name: 'instock1.totalMoney', value: record.get('totalMoney'),id:'rukutotalmoney'


                                }


                            ]

                        },{
                            title:'入库明细',
                            region:'center',
                            border: false,

                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [

                                {fieldLabel: '商品单号', name: 'instock2.meMerchandiseInfoByMerchandiseId.merchandiseId', value: record1.get('meMerchandiseInfoByMerchandiseId.merchandiseId') },
                                {fieldLabel: '商品名称',  name: 'instock2.meMerchandiseInfoByMerchandiseId.merchandiseName', value: record1.get('meMerchandiseInfoByMerchandiseId.merchandiseName') },
                                {fieldLabel: '入库数量', name: 'instock2.num', value: record1.get('num'),id:'rukunum',
                                    listeners: {
                                        blur: function () {
                                            var num = record1.get("num");
                                            var price = record1.get("price");
                                            var totalmoney = record.get('totalMoney');
                                            var num1 = Ext.getCmp("rukunum").getValue();
                                            var price1 = Ext.getCmp("rukuprice").getValue();
                                            var totalmoney1 = totalmoney - num * price + num1 * price1;
                                            Ext.getCmp("rukutotalmoney").setValue(totalmoney1);
                                        }

                                    } },
                                {fieldLabel: '进价', name: 'instock2.price', value: record1.get('price'), id: 'rukuprice',

                                    listeners: {
                                        blur: function () {
                                            var num = record.get("num");
                                            var price = record.get("price");
                                            var totalmoney = record.get('totalMoney');
                                            var num1 = Ext.getCmp("rukunum").getValue();
                                            var price1 = Ext.getCmp("rukuprice").getValue();
                                            var totalmoney1 = totalmoney - num * price + num1 * price1;
                                            Ext.getCmp("rukutotalmoney").setValue(totalmoney1);
                                        }

                                    }
                                },
                                {fieldLabel: 'id',  name: 'instock2.id', value: record1.get('id'),hidden:true },
                                {fieldLabel: '入库单号',  name: 'instock2.meInStockInfoByBillCode.billCode', value: record1.get('meInStockInfoByBillCode.billCode'),hidden:true }

                            ]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '修改',handler: a.update1 },
                { text: '重置' , handler: function () { this.up('window').down('form').getForm().reset();} }
            ]
        }).show();

    },
    update1:function(){
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/updateaa',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showinstock').store.reload();
                    Ext.getCmp('grid2').store.reload();
                    Ext.getCmp('instockbianji').close();
                    Ext.Msg.alert('系统提示', msg.message);
                },
                failure: function (form, action) {

                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('系统提示', msg.message);
                }
            });
        }
    }


});


