

Ext.define('js.showuser', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {

        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'userstorid',
            autoLoad: false,
            fields: ['operId','operName','pwd','address','linkTel','qq','email','mobile',
                'auRoleInfoByRoleId.roleName','baLogInfosByOperId.logTime','state'
                ],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/userzhanshi',
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
            title: '操作员展示',
            closable:true,
            store: ss,
            id: 'showuserzhanshi',
            tbar: [


                {
                    fieldLabel:'角色编码',
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
                {dataIndex: 'operId', text: '操作员编码'
                },
                {dataIndex: 'operName', text: '操作员'
                },
                {dataIndex: 'pwd', text: '密码',hidden:true
                },
                {dataIndex: 'address', text: '地址'
                },
                {dataIndex: 'linkTel', text: '电话'
                },
                {dataIndex: 'auRoleInfoByRoleId.roleName', text: '角色名称'
                } ,
                {dataIndex: 'qq', text: 'qq'
                },
                {dataIndex: 'email', text: 'email'
                },
                {dataIndex: 'mobile', text: '手机'
                }, {dataIndex: 'state', text: '状态'
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
        var quanxian = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/selectroleinfo',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['roleId', 'roleName'],
            autoLoad: true
        });
        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id : "usersave",
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '操作员编码',
                            name: 'user.operId'
                        },
                        {
                            fieldLabel: '操作员',
                            name: 'user.operName'
                        },

                        {
                            fieldLabel: '密码',
                            inputType:'password',
                            name: 'user.pwd'
                        },
                        {
                            fieldLabel: '地址',
                            name: 'user.address'
                        },
                        {
                            fieldLabel: '电话',
                            name: 'user.linkTel'
                        },
                        {
                            fieldLabel: ' email',
                            name: 'user.email'
                        },

                        {
                            fieldLabel: 'QQ',
                            name: 'user.qq'
                        },
                        {
                            fieldLabel: '角色名称',
                            xtype:'combobox',
                            name: 'user.auRoleInfoByRoleId.roleId',
                            store: quanxian,
                            queryMode: 'local',
                            emptyText: '请选择...',
//                            value: record.raw.baSupplierInfoBySupplierId.supplierId,
                            displayField: 'roleName',
                            valueField: 'roleId'

                        },
                        {
                            fieldLabel: '手机',
                            name: 'user.mobile'
                        }, {
                            fieldLabel: '状态',
                            name: 'user.state'
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
        var record= Ext.getCmp("showuserzhanshi").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'userdelete?user.operId=' + record.get('operId'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.a=1) {
                                Ext.getCmp('showuserzhanshi').store.reload();
                            }
                        }
                    });
                }
            }
        });
    },

    tb2:function(update){
        var quanxian = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/selectroleinfo',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['roleId', 'roleName'],
            autoLoad: true
        });
        //var me1=this;
        var record= Ext.getCmp("showuserzhanshi").getSelectionModel().getSelection()[0];

        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id:'userupdate',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '操作员编码', allowBlank: false,  name: 'user.operId', value: record.get('operId') },
                        {fieldLabel: '操作员', allowBlank: false, name: 'user.operName', value: record.get('operName')  },
                        {fieldLabel: '角色名称', allowBlank: false,
                            xtype:'combobox',
                            name: 'user.auRoleInfoByRoleId.roleId',
                            store: quanxian,
                            queryMode: 'local',
                           value: record.raw.auRoleInfoByRoleId.roleId,
                            displayField: 'roleName',
                            valueField: 'roleId'

                        },
                        {fieldLabel: '密码', allowBlank: false, name: 'user.pwd', value: record.get('pwd') },
                        {fieldLabel: '地址', allowBlank: false, name: 'user.address', value: record.get('address') },
                        {fieldLabel: '电话',  name: 'user.linkTel', value: record.get('linkTel') },
                        {fieldLabel: 'QQ',  name: 'user.qq', value: record.get('qq')  },
                        {fieldLabel: 'Email',  name: 'user.email', value: record.get('email') },
                        {fieldLabel: '手机', allowBlank: false, name: 'user.mobile', value: record.get('mobile') },
                        {fieldLabel: '状态', allowBlank: false, name: 'user.state', value: record.get('state') }

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
    insert: function (){
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/userinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showuserzhanshi').store.reload();
                    Ext.getCmp('usersave').close();
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
                url: '/userupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showuserzhanshi').store.reload();
                    Ext.getCmp('userupdate').close();
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




