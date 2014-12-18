
Ext.define('js.test',{
    extend: 'Ext.chart.Chart',
    initComponent: function () {
        var test = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/kucun',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['meMerchandiseInfoByMerchandiseId.merchandiseName', 'num'],
            autoLoad: true
        });
        Ext.apply(this, {
            title: '库存图',
            closable:true,
                width: 500,
                height: 350,
                animate: true,
                store: test,
                theme: 'Base:gradients',
                series: [{
                    type: 'pie',
                    angleField: 'num',
                    showInLegend: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function(storeItem, item) {
                            var total = 0;
                            test.each(function(rec) {
                                total += rec.get('num');
                            });
                            this.setTitle(storeItem.get('meMerchandiseInfoByMerchandiseId.merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'meMerchandiseInfoByMerchandiseId.merchandiseName',
                        display: 'rotate',
                        contrast: true,
                        font: '18px Arial'
                    }
                }]
            });
        this.callParent();
    }


});


