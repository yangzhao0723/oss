package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_OutStockDetailsInfo")
public class TMeOutStockDetailsInfoEntity {
    private int id;
    private Integer num;
    private BigDecimal price;
    private BigDecimal stockPrice;
    private TMeMerchandiseInfoEntity meMerchandiseInfoByMerchandiseId;
    private TMeOutStockInfoEntity meOutStockInfoByOutBillCode;

    @Id
    @Column(name = "ID",insertable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "stock_price")
    public BigDecimal getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(BigDecimal stockPrice) {
        this.stockPrice = stockPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOutStockDetailsInfoEntity that = (TMeOutStockDetailsInfoEntity) o;

        if (id != that.id) return false;
        if (num != null ? !num.equals(that.num) : that.num != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (stockPrice != null ? !stockPrice.equals(that.stockPrice) : that.stockPrice != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (num != null ? num.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (stockPrice != null ? stockPrice.hashCode() : 0);
        return result;
    }



    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")

    public TMeMerchandiseInfoEntity getMeMerchandiseInfoByMerchandiseId() {
        return meMerchandiseInfoByMerchandiseId;
    }

    public void setMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfoEntity meMerchandiseInfoByMerchandiseId) {
        this.meMerchandiseInfoByMerchandiseId = meMerchandiseInfoByMerchandiseId;
    }
    @ManyToOne
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")

    public TMeOutStockInfoEntity getMeOutStockInfoByOutBillCode() {
        return meOutStockInfoByOutBillCode;
    }

    public void setMeOutStockInfoByOutBillCode(TMeOutStockInfoEntity meOutStockInfoByOutBillCode) {
        this.meOutStockInfoByOutBillCode = meOutStockInfoByOutBillCode;
    }
}
