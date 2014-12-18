
Ext.define('js.showkucun', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'kucunstorid',
            autoLoad: false,
            fields: ['meMerchandiseInfoByMerchandiseId.merchandiseId', 'meMerchandiseInfoByMerchandiseId.merchandiseName','meMerchandiseInfoByMerchandiseId.meMerchandiseCInfoByMerchandiseCid.merchandiseCName','num','avgPrice'],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/kucun',
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
                {'name':'meMerchandiseInfoByMerchandiseId.merchandiseId','chaxunname':'商品编码'},
                {'name':'meMerchandiseInfoByMerchandiseId.merchandiseName','chaxunname':'商品名字'}
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
            title: ' 库存信息',
            closable:true,
            store: ss,
            id: 'showkucun',
            tbar: [
                {   xtype:'combo',
                    fieldLabel:'查询条件',
                    name:'chaxuncode',
                    id:'fsid',
                    displayField:'chaxunname',
                    valueField:'name',
                    store:tiaojian
                },
                {
                    xtype:'textfield',
                    id:'getidkucun',
                    name:'code'
                },
                {   xtype: 'button',
                    text: '查询',
                    icon: "img/select.png",
                    cls: "x-btn-text-icon",
                    handler:function(){
                        Ext.getCmp('showkucun').store.load({
                            params:{
                                chaxuncode:Ext.getCmp("fsid").getValue(),
                                code:Ext.getCmp('getidkucun').getValue()
                            }
                        })
                    }
                }
            ],
            columns: [
                {dataIndex: 'meMerchandiseInfoByMerchandiseId.merchandiseId', text: '商品编码'
                },
                {dataIndex: 'meMerchandiseInfoByMerchandiseId.merchandiseName', text: '商品名称'
                },
                {dataIndex: 'meMerchandiseInfoByMerchandiseId.meMerchandiseCInfoByMerchandiseCid.merchandiseCName', text: '商品类别'
                },
                {dataIndex: 'num', text: '库存数量'
                },
                {dataIndex: 'avgPrice', text: '平均价'
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
    tb:function(save){
        //var me1=this;
        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id : "suppliersave",
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '供货商编码',
                            name: 'supplier.supplierId'
                        },
                        {
                            fieldLabel: '供应商名称',
                            name: 'supplier.supplierName'
                        },

                        {
                            fieldLabel: '供应商助记码',
                            name: 'supplier.supplierAb'
                        },
                        {
                            fieldLabel: '地址',
                            name: 'supplier.address'
                        },
                        {
                            fieldLabel: '联系人',
                            name: 'supplier.linkName'
                        },
                        {
                            fieldLabel: 'qq',
                            name: 'supplier.qq'
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'supplier.Email'
                        },
                        {
                            fieldLabel: '状态',
                            name: 'supplier.state'
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'supplier.sortId'
                        },
                        {
                            fieldLabel: '电话',
                            name: 'supplier.linkTel'
                        }

                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '添加',handler: save.insert },
                { text: '重置' , handler: function () { this.up('window').down('form').getForm().reset();} }
            ]

        }).show();
    },
    delete:function(){
        var record= Ext.getCmp("showghs").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'ghsdelete?supplier.supplierId=' + record.get('supplierId'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.panduan) {
                                Ext.getCmp('showghs').store.reload();
                            }
                        }
                    });
                }
            }
        });
    },

    tb2:function(update){
        //var me1=this;
        var record= Ext.getCmp("showghs").getSelectionModel().getSelection()[0];

        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id:'supplierupdate',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '供应商编码', allowBlank: false, name: 'supplier.supplierId', value: record.get('supplierId') },
                        {fieldLabel: '供应商名称', allowBlank: false, name: 'supplier.supplierName', value: record.get('supplierName') },
                        {fieldLabel: '供应商助记码', allowBlank: false, name: 'supplier.supplierAb', value: record.get('supplierAb') },
                        {fieldLabel: '住址', allowBlank: false, name: 'supplier.address', value: record.get('address') },
                        {fieldLabel: '联系人', allowBlank: false, name: 'supplier.linkName', value: record.get('linkName') },
                        {fieldLabel: '联系电话', allowBlank: false, name: 'supplier.linkTel', value: record.get('linkTel') },
                        {fieldLabel: 'QQ', name: 'supplier.QQ', value: record.get('qq') },
                        {fieldLabel: 'Email', name: 'supplier.email', value: record.get('email') },
                        {fieldLabel: '排序编码', name: 'supplier.sortId', value: record.get('sortId') },
                        {fieldLabel: '排序状态', name: 'supplier.state', value: record.get('state') }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '修改',handler: update.update },
                { text: '重置' , handler: function () { this.up('window').down('form').getForm().reset();} }
            ]

        }).show();
    },

//    delete: function (){
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/ghsdelete',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.getCmp('showghs').store.reload();
//                    Ext.getCmp('supplierdelete').close();
//                    Ext.Msg.alert('系统提示', msg.message);
//                },
//                failure: function (form, action) {
//
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.Msg.alert('系统提示', msg.message);
//                }
//            });
//        }
//    },
    insert: function (){
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/ghsinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showghs').store.reload();
                    Ext.getCmp('suppliersave').close();
                    Ext.Msg.alert('系统提示', msg.message);
                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('系统提示', msg.message);
                }
            });
        }
    },
    update : function (){
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/ghsupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showghs').store.reload();
                    Ext.getCmp('supplierupdate').close();
                    Ext.Msg.alert('系统提示', msg.message);
                },
                failure: function (form, action) {

                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('系统提示', msg.message);
                }
            });
        }
    }
//    select : function (){
//        Ext.getCmp("weiyi").store.load({params:{id:Ext.getCmp("getid").getValue()}})
//    }
});




