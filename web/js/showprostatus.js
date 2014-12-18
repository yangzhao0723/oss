

Ext.define('js.showprostatus', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'storid',
            autoLoad: false,
            fields: ['proStatusName','status','remark','proStatusId'],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/status',
                reader: {
                    type: 'json',
                    root: 'mes',
                    totalProperty: 'count'
                }
            }
        });


        ss.load({
            params: {
                start: 0,
                limit: 3
            }
        });

        Ext.apply(this, {
            //grid模板
            title: '商品分类信息',
            closable:true,
            store: ss,
            id: 'showprostatus',
            tbar: [
                {
                    fieldLabel:'id',
                    xtype: 'textfield',
                    labelAlign:"right",
                    layout:'fit'

                },
                {   xtype: 'button',
                    text: '查询',
                    icon: "img/select.png",
                    cls: "x-btn-text-icon"

                },

                {
                    xtype: 'button',
                    text: '添加',
                    icon: "img/add.png",
                    cls: "x-btn-text-icon",
                    handler: function () {
                        me.tb(me);
                    }
                },
                {
                    xtype: 'button',
                    text: '删除',
                    icon: "img/delete.png",
                    cls: "x-btn-text-icon",
                    handler: function () {
                        me.delete();
                    }

                },
                {
                    xtype: 'button',
                    text: '编辑',
                    icon: "img/update.png",
                    cls: "x-btn-text-icon",
                    handler: function () {
                        me.tb2(me);
                    }
                }
            ],
            columns: [
                {dataIndex: 'proStatusId', text: '促销状态编码'
                },
                {dataIndex: 'proStatusName', text: '促销状态名称'
                },
                {dataIndex: 'status', text: '状态'
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
    },
    tb:function(save){
        //var me1=this;
        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id : "prostatussave",
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '促销状态名称',
                            name: 'prostatus.proStatusName'
                        },
                        {
                            fieldLabel: '状态',
                            name: 'prostatus.status'
                        },

                        {
                            fieldLabel: '备注',
                            name: 'prostatus.remark'
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
        var record= Ext.getCmp("showprostatus").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'prostatusdelete?prostatus.proStatusId=' + record.get('proStatusId'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.panduan) {
                                Ext.getCmp('showprostatus').store.reload();
                            }
                        }
                    });
                }
            }
        });
    },

    tb2:function(update){
        //var me1=this;
        var record= Ext.getCmp("showprostatus").getSelectionModel().getSelection()[0];

        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id:'prostatusupdate',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '促销状态编码', allowBlank: false, name: 'prostatus.proStatusId', value: record.get('proStatusId') ,hidden:true },
                        {fieldLabel: '促销状态名称', allowBlank: false, name: 'prostatus.proStatusName', value: record.get('proStatusName') },
                        {fieldLabel: '状态', allowBlank: false, name: 'prostatus.status', value: record.get('status') },
                        {fieldLabel: '备注',  name: 'prostatus.remark', value: record.get('remark') }


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
                url: '/prostatusinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showprostatus').store.reload();
                    Ext.getCmp('prostatussave').close();
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
                url: '/prostatusupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showprostatus').store.reload();
                    Ext.getCmp('prostatusupdate').close();
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




