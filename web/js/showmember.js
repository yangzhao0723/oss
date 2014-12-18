
Ext.define('js.showmember', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'storid',
            autoLoad: false,
            fields: ['userName','pwd','email','lName','balance','status','regDate','activeDate','remark'],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/member',
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
            title: '会员信息',
            closable:true,
            store: ss,
            id: 'showmember',
            tbar: [

                {
                    fieldLabel:'供货商id',
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
                {dataIndex: 'userName', text: '用户名'
                },
                {dataIndex: 'pwd', text: '密码'
                },
                {dataIndex: 'lName', text: '姓名'
                },
                {dataIndex: 'email', text: 'Email'
                },
                {dataIndex: 'balance', text: '余额'
                },
                {dataIndex: 'status', text: '状态'
                },
                {dataIndex: 'regDate', text: '注册日期'
                } ,
                {
                  dataIndex:'activeDate'  ,text:'激活日期'
                },
                {
                    dataIndex: 'remark', text: '备注'
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
        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id : "membersave",
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '用户名',
                            name: 'member.userName'
                        },
                        {
                            fieldLabel: '密码',
                            name: 'member.pwd'
                        },
                        {
                            fieldLabel: '姓名',
                            name: 'member.lName'
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'member.email'
                        },

                        {
                            fieldLabel: '余额',
                            name: 'member.balance'
                        },
                        {
                            fieldLabel: '状态',
                            name: 'member.state'
                        },
                        {
                            fieldLabel: '注册日期',
                            name: 'member.regDate'
                        },
                        {
                            fieldLabel: '激活日期',
                            name: 'member.activeDate'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'member.remark'
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
        var record= Ext.getCmp("showmember").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'memberdelete?member.userName=' + record.get('userName'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.panduan) {
                                Ext.getCmp('showmember').store.reload();
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
                url: '/memberinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showmember').store.reload();
                    Ext.getCmp('membersave').close();
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




