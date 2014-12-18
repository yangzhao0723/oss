

Ext.define('js.showzhanshi', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'zhanshistorid',
            autoLoad: false,
            fields: ['merchandiseId','merchandiseName','merchandiseAb','price',
                'meMerchandiseCInfoByMerchandiseCid.merchandiseCName','meProStatusInfoByProStatusId.proStatusName',
                    'meUnitInfoByUnitId.name','saleStatus','spec','describe','remark'],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/zhanshi',
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
                {'name':'merchandiseId','chaxunname':'商品编码'},
                {'name':'merchandiseName','chaxunname':'商品名字'}
            ]
        });
        ss.load({
            params: {
                start: 0,
                limit: 3
            }
        });

        Ext.apply(this, {
            //grid模板
            title: '商品信息展示',
            closable:true,
            store: ss,
            id: 'showzhanshi',
            tbar: [



//                {
//                    xtype: 'button',
//                    text: '添加',
//                    icon: "img/add.png",
//                    cls: "x-btn-text-icon",
//                    handler: function () {
//                        me.tb(me);
//                    }
//                },
//                {
//                    xtype: 'button',
//                    text: '删除',
//                    icon: "img/delete.png",
//                    cls: "x-btn-text-icon",
//                    handler: function () {
//                        me.delete();
//                    }
//
//                },
//                {
//                    xtype: 'button',
//                    text: '编辑',
//                    icon: "img/update.png",
//                    cls: "x-btn-text-icon",
//                    handler: function () {
//                        me.tb2(me);
//                    }
//                },
                {
                    xtype:'combo',
                    fieldLabel:'查询条件',
                    name:'chaxuncode',
                    id:'efid',
                    displayField:'chaxunname',
                    valueField:'name',
                    store:tiaojian
                },
                {
                    xtype:'textfield',
                    id:'getidzhanshi',
                    name:'code'
                },
                {   xtype: 'button',
                    text: '查询',
                    icon: "img/select.png",
                    cls: "x-btn-text-icon",
                    handler:function(){
                        Ext.getCmp('showzhanshi').store.load({
                            params:{
                                chaxuncode:Ext.getCmp("efid").getValue(),
                                code:Ext.getCmp('getidzhanshi').getValue()
                            }
                        })
                    }
                }

            ],
            columns: [
                {dataIndex: 'merchandiseId', text: '商品编码'
                },
                {dataIndex: 'merchandiseName', text: '商品名称'
                },
                {dataIndex: 'merchandiseAb', text: '商品助记码'
                },
                {dataIndex: 'price', text: '商品单价'
                },
                {dataIndex: 'meMerchandiseCInfoByMerchandiseCid.merchandiseCName', text: '商品类别'
                },
                {dataIndex: 'meUnitInfoByUnitId.name', text: '商品单位'
                } ,
                {dataIndex: 'saleStatus', text: '销售状态'
                },
                {dataIndex: 'meProStatusInfoByProStatusId.proStatusName', text: '商品促销状态',align:"center"

                },
                {dataIndex: 'spec', text: '规格'
                },
                {dataIndex: 'describe', text: '描述'
                },
                {dataIndex: 'remark', text: '备注'
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
    }
//    tb:function(save){
//        //var me1=this;
//        Ext.create('Ext.window.Window', {
//            title: '添加数据',
//            width: 500,
//            height: 350,
//            layout: 'fit',
//            id : "deliverysave",
//            items: [
//                {
//                    xtype: 'form',
//                    layout: 'form',
//                    defaults: {
//                        xtype: 'textfield'
//                    },
//                    items: [
//                        {
//                            fieldLabel: '配送商编码',
//                            name: 'delivery.deliveryId'
//                        },
//                        {
//                            fieldLabel: '配送商名称',
//                            name: 'delivery.deliveryName'
//                        },
//
//                        {
//                            fieldLabel: '地址',
//                            name: 'delivery.address'
//                        },
//                        {
//                            fieldLabel: '联系人',
//                            name: 'delivery.linkName'
//                        },
//                        {
//                            fieldLabel: '联系电话',
//                            name: 'delivery.linkTel'
//                        },
//
//                        {
//                            fieldLabel: 'QQ',
//                            name: 'delivery.qq'
//                        },
//                        {
//                            fieldLabel: 'Email',
//                            name: 'delivery.email'
//                        },
//                        {
//                            fieldLabel: '排序编码',
//                            name: 'delivery.sortId'
//                        },
//
//                        {
//                            fieldLabel: ' 状态',
//                            name: 'delivery.state'
//                        }
//
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '添加',handler: save.insert },
//                { text: '重置' , handler: function () { this.up('window').down('form').getForm().reset();} }
//            ]
//
//        }).show();
//    },
//    delete:function(){
//        var record= Ext.getCmp("showdelivery").getSelectionModel().getSelection()[0];
//        Ext.MessageBox.show({
//            title: '删除提示',
//            msg: '确实要删除数据么?',
//            buttons: Ext.MessageBox.YESNO,
//            icon: Ext.MessageBox.WARNING,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    Ext.Ajax.request({
//                        url: 'deliverydelete?delivery.deliveryId=' + record.get('deliveryId'),
//                        success: function (action) {
//                            var result;
//                            if (typeof (action.responseText) === "string") {
//                                result = Ext.JSON.decode(action.responseText);
//                            }
//                            else {
//                                result = action.responseText;
//                            }
//                            if (result.panduan) {
//                                Ext.getCmp('showdelivery').store.reload();
//                            }
//                        }
//                    });
//                }
//            }
//        });
//    },
//
//    tb2:function(update){
//        //var me1=this;
//        var record= Ext.getCmp("showdelivery").getSelectionModel().getSelection()[0];
//
//        Ext.create('Ext.window.Window', {
//            title: '添加数据',
//            width: 500,
//            height: 350,
//            layout: 'fit',
//            id:'deliveryupdate',
//            items: [
//                {
//                    xtype: 'form',
//                    layout: 'form',
//                    defaults: {
//                        xtype: 'textfield'
//                    },
//                    items: [
//                        {fieldLabel: '配送商编码', allowBlank: false, name: 'delivery.deliveryId', value: record.get('deliveryId') },
//                        {fieldLabel: '配送商名称', allowBlank: false, name: 'delivery.deliveryName', value: record.get('deliveryName')  },
//                        {fieldLabel: '地址', allowBlank: false, name: 'delivery.address', value: record.get('address') },
//                        {fieldLabel: '联系人', allowBlank: false, name: 'delivery.linkName', value: record.get('linkName') },
//                        {fieldLabel: '联系电话',  name: 'delivery.linkTel', value: record.get('linkTel') },
//                        {fieldLabel: 'QQ',  name: 'delivery.qq', value: record.get('qq')  },
//                        {fieldLabel: 'Email',  name: 'delivery.email', value: record.get('email') },
//                        {fieldLabel: '排序编码', allowBlank: false, name: 'delivery.sortId', value: record.get('sortId') },
//                        {fieldLabel: '状态',  name: 'delivery.status', value: record.get('status') }
//
//
//
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '修改',handler: update.update },
//                { text: '重置' , handler: function () { this.up('window').down('form').getForm().reset();} }
//            ]
//
//        }).show();
//    },
//    insert: function (){
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/deliveryinsert',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.getCmp('showdelivery').store.reload();
//                    Ext.getCmp('deliverysave').close();
//                    Ext.Msg.alert('系统提示', msg.message);
//                },
//                failure: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.Msg.alert('系统提示', msg.message);
//                }
//            });
//        }
//    },
//    update : function (){
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/deliveryupdate',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.getCmp('showdelivery').store.reload();
//                    Ext.getCmp('deliveryupdate').close();
//                    Ext.Msg.alert('系统提示', msg.message);
//                },
//                failure: function (form, action) {
//
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.Msg.alert('系统提示', msg.message);
//
//                }
//            });
//        }
//    }
//    select : function (){
//        Ext.getCmp("weiyi").store.load({params:{id:Ext.getCmp("getid").getValue()}})
//    }
});




