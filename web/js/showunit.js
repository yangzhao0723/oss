
Ext.define('js.showunit', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        //建立store的数据储存
        var ss = Ext.create('Ext.data.Store', {
            id: 'storid',
            autoLoad: false,
            fields: ['unitId','name','status','remark'],
            pageSize: 3,
            proxy: {
                type: 'ajax',
                url: '/queryCode',
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
                {'name':'name','chaxunname':'名称'}
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
            title: '商品单位信息',
            closable:true,
            store: ss,
            selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
            id: 'showunit',
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
                    id:'etid',
                    displayField:'chaxunname',
                    valueField:'name',
                    store:tiaojian
                },
                {
                    xtype:'textfield',
                    id:'getidunit',
                    name:'code'
                },
                {   xtype: 'button',
                    text: '查询',
                    icon: "img/select.png",
                    cls: "x-btn-text-icon",
                    handler:function(){
                        Ext.getCmp('showunit').store.load({
                            params:{
                                chaxuncode:Ext.getCmp("etid").getValue(),
                                code:Ext.getCmp('getidunit').getValue()
                            }
                        })
                    }
                }
            ],
            columns: [
                {dataIndex: 'name', text: '名称'
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
            id : "unitsave",
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '名称',
                            name: 'unit.name'
                        },
                        {
                            fieldLabel: '状态',
                            name: 'unit.status'
                        },

                        {
                            fieldLabel: '备注',
                            name: 'unit.remark'
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
        var record= Ext.getCmp("showunit").getSelectionModel().getSelection();
        var length1=record.length;
        if(record.length>1){
            var list='';
            for(var i= 0 , length= record.length;i<length;i++){
                list+=record[i].get('unitId');
                if (i != length - 1) {
                    list += ',';
                }
            };
            Ext.Msg.show({
                title:'删除',
                msg:'确定要删除'+record.length+'条数据吗？',
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YESNO,
                fn:function(btn){
                    if(btn=='yes'){
                        Ext.Ajax.request({
                            url: '/unitdeletes?unitids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);
                                Ext.getCmp('showunit').store.reload();
                                var totalCount = Ext.getCmp('showunit').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('showunit').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('showunit').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length1;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('showunit').store.currentPage-1;
                                    Ext.getCmp('showunit').store.loadPage(Ext.getCmp('showunit').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                            },
                            failure: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);
                                Ext.getCmp('tMeUnitInfoid').store.reload();
                                Ext.MessageBox.show({
                                    title: '失败',
                                    msg: msg.msg,
                                    icon: Ext.MessageBox.QUESTION,
                                    buttons: Ext.MessageBox.YES
                                });
                            }
                        });
                    }
                }
            })

        }
        else{

        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据么?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'unitdelete?unit.unitId=' + record[0].get('unitId'),
                        success: function (action) {
                            var result;
                            if (typeof (action.responseText) === "string") {
                                result = Ext.JSON.decode(action.responseText);
                            }
                            else {
                                result = action.responseText;
                            }
                            if (result.panduan) {
                                Ext.getCmp('showunit').store.reload();
                            }
                        }
                    });
                }
            }
        });}
    },

    tb2:function(update){
        //var me1=this;
        var record= Ext.getCmp("showunit").getSelectionModel().getSelection()[0];

        Ext.create('Ext.window.Window', {
            title: '添加数据',
            width: 500,
            height: 350,
            layout: 'fit',
            id:'unitupdate',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '单位编码', allowBlank: false, name: 'unit.unitId', value: record.get('unitId') ,hidden:true },
                        {fieldLabel: '促销状态名称', allowBlank: false, name: 'unit.name', value: record.get('name') },
                        {fieldLabel: '状态', allowBlank: false, name: 'unit.status', value: record.get('status') },
                        {fieldLabel: '备注',  name: 'unit.remark', value: record.get('remark') }


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
                url: '/unitinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showunit').store.reload();
                    Ext.getCmp('unitsave').close();
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
                url: '/unitupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('showunit').store.reload();
                    Ext.getCmp('unitupdate').close();
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




