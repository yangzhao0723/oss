
Ext.define('js.showoutstock1', {
    extend: 'Ext.grid.Panel',

    initComponent: function () {
        var me = this;
        //建立store的数据储存

        var ss = Ext.create('Ext.data.Store', {
            id: 'storid',
            autoLoad: false,
            fields: ['outBillCode', 'outType','outTime','handler1','totalMoney','auOperInfoByOperId.operName','remark','id',{name:'auOperInfoByOperId.operId',type:'string'}],
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: '/outstockselect',
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
                {'name':'outBillCode','chaxunname':'出库单号'},
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
            title: '出库明细信息',
            closable:true,
            store: ss,
            id: 'showoutstock',
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
                        Ext.getCmp('showoutstock').store.reload();
                    }

                },
                {
                    xtype:'combo',
                    fieldLabel:'查询条件',
                    icon: "img/select.png",
                    name:'chaxuncode',
                    id:'stid3',
                    displayField:'chaxunname',
                    valueField:'name',
                    store:tiaojian
                },
                {
                    xtype:'textfield',
                    id:'getidchuku',
                    name:'code'
                },
                {
                    xtype: 'button',
                    text: '查询',
                    icon: "img/select.png",
                    cls: "x-btn-text-icon",
                    handler:function(){
                        Ext.getCmp('showoutstock').store.load({
                            params:{
                                chaxuncode:Ext.getCmp("stid3").getValue(),
                                code:Ext.getCmp('getidchuku').getValue()
                            }
                        })
                    }
                }

            ],
            columns: [
                {dataIndex: 'outBillCode', text: '出库单号'
                },


                {dataIndex: 'outTime', text: '出库时间'
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
                    dataIndex: 'outType', text: '出库方式'
                },{
                    dataIndex: 'totalMoney', text: '出库总价'
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
       var record1 = Ext.getCmp("showoutstock").getSelectionModel().getSelection()[0];
       var aa1 = Ext.create('Ext.data.Store', {
           id: 'storid2',
           pageSize: 2,
           proxy: {
               type: 'ajax',
               url: '/select2.action?merchandise1.meOutStockInfoByOutBillCode.outBillCode=' + record1.get('outBillCode'),
               reader: {
                   type: 'json',
                   root: 'mes',
                   totalProperty: 'count'
               }
           },
           fields: [
               {name: 'num', type: 'int'},
               {name: 'meMerchandiseInfoByMerchandiseId.merchandiseName', type: 'string'},
                {name:'meMerchandiseInfoByMerchandiseId.merchandiseId',type:'string'},
               {name:'price',type:'money'},
               {name:'id',type:'int'},
               {name:'stockPrice',type:'money'},
               {name:'meOutStockInfoByOutBillCode.outBillCode',type:'string'}



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
                   id: 'outgrid2',
                   store: aa1,
                   columns: [
                       {text: '商品单号', dataIndex: 'meMerchandiseInfoByMerchandiseId.merchandiseId'},
                       {text: '商品名称', dataIndex: 'meMerchandiseInfoByMerchandiseId.merchandiseName'},
                       {text: '出库数量', dataIndex: 'num',id:'dangenum1'},
                       {text: '售价', dataIndex: 'price',id:'dangeprice1'},
                       { text:'出库单号',dataIndex:'meOutStockInfoByOutBillCode.outBillCode' },
                       {text: '成本价', dataIndex: 'stockPrice'}
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
        var record= Ext.getCmp("showoutstock").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'deteleaa1?instock1.outBillCode=' + record.get('outBillCode'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.panduan) {
                                Ext.getCmp('showoutstock').store.reload();
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
                {"abbr": 1, "name": "正常出库"},
                {"abbr": 2, "name": "盘亏"},
                {"abbr": 3, "name": "报损"}

            ]
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
        var record = Ext.getCmp("showoutstock").getSelectionModel().getSelection()[0];
        var record1 = Ext.getCmp("outgrid2").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window', {
            title: '商品出库及明细表',
            width: 350,
            height: 500,
            layout: 'fit',
            id:'outstockbianji',
            items:[
                {
                    xtype:'form',
                    layout:'border',
                    items:[
                        {
                            title:'出库信息',
                            region: 'north',
                            border: false,
                            height: 260,
                            defaults: {
                                xtype: 'textfield'
                            },


                            items: [
                                {fieldLabel: '出库单号',  name: 'instock1.outBillCode', value: record.get('outBillCode') },


                                {fieldLabel: '出库时间',  name: 'instock1.outTime', value: record.get('outTime') },
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
                                    fieldLabel: '出库方式',
                                    name: 'instock1.outType',
                                    allowBlank: false,
                                    displayField: 'name',
                                    valueField: 'abbr',
                                    value: record.raw.outType
                                },
                                {fieldLabel: 'id',  name: 'instock1.id', value: record.get('id') ,hidden:true},
                                {fieldLabel: '出库金额',  name: 'instock1.totalMoney', value: record.get('totalMoney'),id:'chukutotalmoney1'


                                }


                            ]

                        },{
                            title:'出库明细',
                            region:'center',
                            border: false,

                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel:'成本价',name:'instock2.stockPrice',value:record1.get('stockPrice'),hidden:true},
                                {fieldLabel: '商品单号', name: 'instock2.meMerchandiseInfoByMerchandiseId.merchandiseId', value: record1.get('meMerchandiseInfoByMerchandiseId.merchandiseId') },
                                {fieldLabel: '商品名称',  name: 'instock2.meMerchandiseInfoByMerchandiseId.merchandiseName', value: record1.get('meMerchandiseInfoByMerchandiseId.merchandiseName') },
                                {fieldLabel: '出库数量', name: 'instock2.num', value: record1.get('num'),id:'chukunum1',
                                    listeners: {
                                        blur: function () {
                                            var num = record1.get("num");
                                            var price = record1.get("price");
                                            var totalmoney = record.get('totalMoney')
                                            var num1 = Ext.getCmp("chukunum1").getValue();
                                            var price1 = Ext.getCmp("chukuprice1").getValue();
                                            var totalmoney1 = totalmoney - num * price + num1 * price1;
                                            Ext.getCmp("chukutotalmoney1").setValue(totalmoney1);
                                        }

                                    } },
                                {fieldLabel: '售价', name: 'instock2.price', value: record1.get('price'), id: 'chukuprice1',

                                    listeners: {
                                        blur: function () {
                                            var num = record.get("num");
                                            var price = record.get("price");
                                            var totalmoney = record.get('totalMoney')
                                            var num1 = Ext.getCmp("chukunum1").getValue();
                                            var price1 = Ext.getCmp("chukuprice1").getValue();
                                            var totalmoney1 = totalmoney - num * price + num1 * price1;
                                            Ext.getCmp("chukutotalmoney1").setValue(totalmoney1);
                                        }

                                    }
                                },
                                {fieldLabel: 'id',  name: 'instock2.id', value: record1.get('id'),hidden:true },
                                {fieldLabel: '出库单号',  name: 'instock2.meOutStockInfoByOutBillCode.outBillCode', value: record1.get('meOutStockInfoByOutBillCode.outBillCode'),hidden:true }

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
                url: '/updateaa1',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showoutstock').store.reload();
                    Ext.getCmp('outgrid2').store.reload();
                    Ext.getCmp('outstockbianji').close();
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


