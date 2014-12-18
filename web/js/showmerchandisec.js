

    Ext.define('js.showmerchandisec', {
        extend: 'Ext.grid.Panel',
        initComponent: function () {
            var me = this;
            //建立store的数据储存
            var ss = Ext.create('Ext.data.Store', {
                id: 'storid',
                autoLoad: false,
                fields: ['merchandiseCid','merchandiseCName','sortId','state'],
                pageSize: 3,
                proxy: {
                    type: 'ajax',
                    url: '/fenlei',
                    reader: {
                        type: 'json',
                        root: 'mes',
                        totalProperty: 'count'
                    }

                }
            });
            var tiaojian1 = Ext.create('Ext.data.Store',{
                fields:['name','chaxunname'],
                data:[
                    {'name':'merchandiseCid','chaxunname':'id'},
                    {'name':'merchandiseCName','chaxunname':'类别名称'}
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
                title: '商品分类信息',
                closable:true,
                store: ss,
//                selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
                id: 'showmerchandisec',
                tbar: [


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
                    },
                    {

                        xtype:'combo',
                        fieldLabel:'查询条件',
                        name:'chaxuncode',
                        id:'eeid1',
                        displayField:'chaxunname',
                        valueField:'name',
                        store:tiaojian1

                    },
                    {
                        xtype:'textfield',
                        id:'getidmerchandisec',
                        name:'code'
                    },
                    {   xtype: 'button',
                        text: '查询',
                        icon: "img/select.png",
                        cls: "x-btn-text-icon",
                        handler:function(){
                            Ext.getCmp('showmerchandisec').store.load({
                                params:{
                                    chaxuncode:Ext.getCmp("eeid1").getValue(),
                                    code:Ext.getCmp('getidmerchandisec').getValue()
                                }
                            })
                        }
                    }

                ],
                columns: [
                    {dataIndex: 'merchandiseCid', text: '商品类别编码'
                    },
                    {dataIndex: 'merchandiseCName', text: '商品类别名称'
                    },
                    {dataIndex: 'sortId', text: '排序编码'
                    },
                    {dataIndex: 'state', text: '状态'
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
                id : "merchandisecsave",
                items: [
                    {
                        xtype: 'form',
                        layout: 'form',
                        defaults: {
                            xtype: 'textfield'
                        },
                        items: [
                            {
                                fieldLabel: '商品类别编码',
                                name: 'merchandisec.merchandiseCid'
                            },
                            {
                                fieldLabel: '商品类别名称',
                                name: 'merchandisec.merchandiseCName'
                            },

                            {
                                fieldLabel: '排序编码',
                                name: 'merchandisec.sortId'
                            },
                            {
                                fieldLabel: '状态',
                                name: 'merchandisec.state'
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
            var record= Ext.getCmp("showmerchandisec").getSelectionModel().getSelection()[0];
            Ext.MessageBox.show({
                title: '删除提示',
                msg: '确实要删除数据么?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: 'merchandisecdelete?merchandisec.merchandiseCid=' + record.get('merchandiseCid'),
                            success: function (action) {
                                var result;
                                if (typeof (action.responseText) === "string") {
                                    result = Ext.JSON.decode(action.responseText);
                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.panduan) {
                                    Ext.getCmp('showmerchandisec').store.reload();
                                }
                            }
                        });
                    }
                }
            });
        },

        tb2:function(update){
            //var me1=this;
            var record= Ext.getCmp("showmerchandisec").getSelectionModel().getSelection()[0];

            Ext.create('Ext.window.Window', {
                title: '添加数据',
                width: 500,
                height: 350,
                layout: 'fit',
                id:'merchandisecupdate',
                items: [
                    {
                        xtype: 'form',
                        layout: 'form',
                        defaults: {
                            xtype: 'textfield'
                        },
                        items: [
                            {fieldLabel: '商品类别编码', allowBlank: false, name: 'merchandisec.merchandiseCid', value: record.get('merchandiseCid') },
                            {fieldLabel: '商品类别名称', allowBlank: false, name: 'merchandisec.merchandiseCName', value: record.get('merchandiseCName') },
                            {fieldLabel: '排序编码', allowBlank: false, name: 'merchandisec.sortId', value: record.get('sortId') },
                            {fieldLabel: '状态', allowBlank: false, name: 'merchandisec.state', value: record.get('state') }


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
                    url: '/merchandisecinsert',
                    success: function (form, action) {
                        var msg = Ext.JSON.decode(action.response.responseText);
                        Ext.getCmp('showmerchandisec').store.reload();
                        Ext.getCmp('merchandisecsave').close();
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
                    url: '/merchandisecupdate',
                    success: function (form, action) {
                        var msg = Ext.JSON.decode(action.response.responseText);
                        Ext.getCmp('showmerchandisec').store.reload();
                        Ext.getCmp('merchandisecupdate').close();
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




