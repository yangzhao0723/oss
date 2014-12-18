package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfoEntity {
    private Integer id;
    private Integer num;
    private BigDecimal price;
    private TMeInStockInfoEntity meInStockInfoByBillCode;
    private TMeMerchandiseInfoEntity meMerchandiseInfoByMerchandiseId;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeInStockDetailsInfoEntity that = (TMeInStockDetailsInfoEntity) o;

        if (id != that.id) return false;
        if (num != that.num) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + num;
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }



    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeInStockInfoEntity getMeInStockInfoByBillCode() {
        return meInStockInfoByBillCode;
    }

    public void setMeInStockInfoByBillCode(TMeInStockInfoEntity meInStockInfoByBillCode) {
        this.meInStockInfoByBillCode = meInStockInfoByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")

    public TMeMerchandiseInfoEntity getMeMerchandiseInfoByMerchandiseId() {
        return meMerchandiseInfoByMerchandiseId;
    }

    public void setMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfoEntity meMerchandiseInfoByMerchandiseId) {
        this.meMerchandiseInfoByMerchandiseId = meMerchandiseInfoByMerchandiseId;
    }
}
