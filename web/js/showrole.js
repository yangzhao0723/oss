Ext.define('js.showrole', {
    extend: 'Ext.panel.Panel',
    aaa: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": "True", "name": "True"},
            {"abbr": "False", "name": "False"}

        ]
    }),

    menuList: '',
    initComponent: function () {


        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'rolestorid',
            autoLoad: false,
            fields: ['roleId', 'roleName', 'sortId', 'state'

            ],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/rolezhanshi',
                reader: {
                    type: 'json',
                    root: 'mes',
                    totalProperty: 'count1'
                }
            }
        });
        //树
//        Ext.Ajax.request({
//            url: 'caidan23',
//            async: false,
//            success: function (response) {
//                me.menuList = Ext.JSON.decode(response.responseText);
//            }
//        });
//        me.roleStore = Ext.create('Ext.data.TreeStore', {
//            autoLoad: true,
//            fields: [
//                {
//                    name: 'id', type: 'String', mapping: 'menuinfoEntity.menuId'
//                },
//                {
//                    name: 'text', type: 'String', mapping: 'menuinfoEntity.menuName'
//                }
//            ],
//            root: {
//                text: '角色权限',
//                id: '-1',
//                children: me.menuList.menulist.children
//            }
//        });
        ss.load({
            params: {
                start: 0,
                limit: 3
            }
        });
        Ext.apply(this, {
            //grid模板
            title: '角色展示',
            closable: true,
            layout: 'border',
            items: [
                {   region: 'west',
                    xtype: 'grid',
                    store: ss,
                    id: 'showrolezhanshi',
                    tbar: [
                        {
                            fieldLabel: '供货商id',
                            xtype: 'textfield',
                            labelAlign: "right",
                            layout: 'fit'
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
                        {dataIndex: 'roleId', text: ' 角色编码', flex: 1
                        },
                        {dataIndex: 'roleName', text: '角色名称', flex: 1
                        },
                        {dataIndex: 'sortId', text: '排序编码', flex: 1
                        },
                        {dataIndex: 'state', text: '状态', renderer: function (value) {
                            if ((value == 'false') || (value == false)) {
                                return '未启用';
                            }
                            if ((value == 'true') || (true == value)) {
                                return '启用';
                            }
                        },
                            flex: 1
                        }
                    ],
                    width: 800,
                    height: 800,
                    bodyStyle: {
                        background: 'url(img/qq.jpg) no-repeat '
                    },
                    //分页的控件
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: ss,
                            dock: 'bottom',
                            displayInfo: true,
                            emptyMsg: "No topics to display"
                        }
                    ],
                    listeners: {
                        itemcontextmenu: function (view, record, item, index, e) {
                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float: true,
                                items: [
                                    {
                                        text: "查看权限",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            roleid = record.get("roleId");

                                            var aa = Ext.getCmp("roletree1").getRootNode();
                                            Ext.Ajax.request({
                                                url: "/caidan45?roleId=" + roleid,
                                                async: false,
                                                success: function (response) {
                                                    me.jsonData = response.responseText;
                                                    if (typeof(me.jsonData) === 'string') {
                                                        me.jsonData = Ext.JSON.decode(me.jsonData);
                                                        me.mystore = me.jsonData.menulist.children;
                                                        aa.removeAll(false);
                                                        Ext.getCmp("roletree1").setRootNode(me.jsonData.menulist);
                                                        Ext.getCmp("roletree1").expandAll();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }}


                },
                {
                    region: 'center',
                    title: '权限展示',
                    items: Ext.create('Ext.tree.Panel', {
                        id: 'roletree1',
                        border: false,
                        collapsible: true,
                        store: Ext.create("Ext.data.TreeStore", {
                            fields: [
                                {name: "text", type: "String", mapping: "menuinfoEntity.menuName"}
                            ],
                            root: {
                                text: 'Ext JS',
                                id: '-1',
                                children: me.mystore
                            }
                        }),
                        rootVisible: false
                    })


                }

            ]

        });
        this.callParent();
    },
    tb: function (save) {
        var me1 = this;
        Ext.Ajax.request({
            url: 'caidan23',
            async: false,
            success: function (response) {
                me1.menuData = Ext.JSON.decode(response.responseText);
            }
        });
        me1.roleStore = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            fields: [
                {
                    name: 'id', type: 'String', mapping: 'menuinfoEntity.menuId'
                },
                {
                    name: 'text', type: 'String', mapping: 'menuinfoEntity.menuName'
                }
            ],
            root: {
                text: '权限',
                id: '-1',
                children: me1.menuData.menulist.children
            }
        });
        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 350,
            height: 550,
            id: "rolesave",
            autoScroll: true,
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    id: 'roleform',

                    items: [
                        {
                            defaults: {
                                xtype: 'textfield'

                            },
                            items: [
                                {
                                    fieldLabel: '角色编码',
                                    name: 'role.roleId',
                                    id: 'roleid'

                                },
                                {
                                    fieldLabel: '角色名称',
                                    id: 'roleName',
                                    name: 'role.roleName'
                                },

                                {
                                    fieldLabel: '排序编码',
                                    name: 'role.sortId'


                                },
                                {
                                    fieldLabel: '状态',

                                    name: 'role.state',
                                    xtype: 'combobox',
                                    store: me1.aaa,
                                    allowBlank: false,
                                    displayField: 'name',
                                    valueField: 'abbr',
                                    hidden: true
                                },
                                { fieldLabel: '权限',
                                    xtype: 'treepanel',
                                    id: 'tree2',
                                    store: me1.roleStore
                                }

                            ]
                        }
//                        {xtype: 'checkboxgroup', fieldLabel: '权限选择',
//                            columns: 2,
//                            id: 'checkboxgroup',
//                            items: [
//                                { boxLabel: '入库管理', name: 'cb', inputValue: '1' },
//                                { boxLabel: '库存管理', name: 'cb', inputValue: '2' },
//                                { boxLabel: '出库管理', name: 'cb', inputValue: '3' },
//                                { boxLabel: '会员管理', name: 'cb', inputValue: '4' },
//                                { boxLabel: '系统设置', name: 'cb', inputValue: '5' },
//                                { boxLabel: '权限管理', name: 'cb', inputValue: '6' }
//                            ],
//                            name: 'checkboxgroupValue'
//                        }
                    ]
                }
//                {
//                xtype:'panel',
//                items:[{
//                    fieldLabel:'权限',
//                    xtype: 'treepanel',
//                    store: me1.roleStore
//
//                }]
//                }

            ],
            buttonAlign: 'center',
            buttons: [
                { text: '添加', handler: function () {
//                    var FileItype = Ext.getCmp('roleform').getForm().
//                        findField('checkboxgroupValue').getValue();
                    var FileItype = Ext.getCmp('tree2').getChecked();
//                    var length = FileItype.length;
                    var data = FileItype;
                    var list = new Array();
                    var roleid = Ext.getCmp('roleid').getValue();
                    var roleName = Ext.getCmp('roleName').getValue();
                    Ext.each(data, function (item, index) {
                        list.push(item.data.id);
                    });
//                    for (var i = 0; i < length; i++) {
//                        list += data[i];
//                        if (i != length - 1) {
//                            list += ',';
//                        }
//                    }
                    Ext.Ajax.request({
                        url: 'aothorizatinInsert',
                        method: 'post',
                        params: {
                            idList: list,
                            roleName: roleName,
                            roleid: roleid

                        },
                        success: function () {
                            Ext.getCmp('showrolezhanshi').store.reload();
                            Ext.MessageBox.show({
                                title: '系统提示',
                                msg: '添加成功',
                                icon: Ext.MessageBox.INFO,
                                buttons: Ext.MessageBox.YES,
                                fn: function () {
                                    Ext.getCmp('rolesave').close();
                                }
                            });
                        }
                    });
                }
                },
                { text: '重置', handler: function () {
                    this.up('window').down('form').getForm().reset();
                } }
            ]

        }).show();
        Ext.getCmp("tree2").expandAll();
    },
    delete: function () {
        var record = Ext.getCmp("showrolezhanshi").getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'roledetele?role.roleId=' + record.get('roleId'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.a = 1) {
                                Ext.getCmp('showrolezhanshi').store.reload();
                            }
                        }
                    });
                }
            }
        });
    },

    tb2: function (update) {

        var role = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/rolezhanshi',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['roleName', 'roleId'],
            autoLoad: true
        });
        //var me1=this;
        var record = Ext.getCmp("showrolezhanshi").getSelectionModel().getSelection()[0];

        Ext.create('Ext.window.Window', {
            title: '添加数据',

            width: 200,
            height: 150,
            layout: 'fit',
            id: 'roleupdate',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '角色编码', allowBlank: false, name: 'role.roleId', value: record.get('roleId'), hidden: true},
                        {fieldLabel: '角色名称', name: 'role.roleName', value: record.get('roleName')
//                            xtype:'combobox',
//                            store: role,
//                            displayField: 'roleName',
//                            valueField: 'roleName',
//                            value:record.raw.roleName
                        },
                        {fieldLabel: '排序编码', allowBlank: false, name: 'role.sortId', value: record.get('sortId') },

                        {fieldLabel: '状态', name: 'role.state', value: record.get('state'), hidden: true }


                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '修改', handler: update.update },
                { text: '重置', handler: function () {
                    this.up('window').down('form').getForm().reset();
                } }
            ]

        }).show();
    },

    update: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/roleupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showrolezhanshi').store.reload();
                    Ext.getCmp('roleupdate').close();
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




