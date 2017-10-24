/*****************************************************************************
 * 移动车险前端接口封装
 *
 * 上海咨果科技混合式开发移动端端js 库
 *
 ******************************************************************************
 */

//初始化
//userChecker();

/**
 * 险别对象
 */
var Kind = function () {
}

Kind.prototype = {
    /**
     * 代码
     * @param {Object} code
     */
    setKindCode: function (kindCode) {
        this.kindCode = kindCode;
    },
    getKindCode: function () {
        return this.kindCode == undefined ? '' : this.kindCode;
    },
    /**
     * 名称
     * @param {Object} name
     */
    setName: function (name) {
        this._name = name;
    },
    getName: function () {
        return this._name == undefined ? '' : this._name;
    },
    /**
     * 不计免赔
     * @param {Object} duty
     */
    setIsDuty: function (duty) {
        this._duty = duty;
    },
    getIsDuty: function () {
        return this._duty == undefined ? '' : this._duty;
    },
    /**
     * 保额列表
     * @param {Object} fees [{name:'10万',value:100000},{}]
     */
    setInsuranceFees: function (fees) {
        this._insurance_fee = fees;
    },
    getInsuranceFees: function () {
        return this._insurance_fee;
    },
    setItemKindNo: function (itemKindNo) {
        this.itemKindNo = itemKindNo;
    },
    getItemKindNo: function () {
        return this.itemKindNo == undefined ? '' : this.itemKindNo;
    },
    setModeCode: function (modeCode) {
        this.modeCode = modeCode;
    },
    getModeCode: function () {
        return this.modeCode == undefined ? '' : this.modeCode;
    },
    setModel: function (model) {
        this.model = model;
    },
    getModel: function () {
        return this.model == undefined ? '' : this.model;
    },
    setValue: function (value) {
        this.value = value;
    },
    getValue: function () {
        return this.value == undefined ? '' : this.value;
    },
    setUnitAmount: function (unitAmount) {
        this.unitAmount = unitAmount;
    },
    getUnitAmount: function () {
        return this.unitAmount == undefined ? '' : this.unitAmount;
    },
    setAmount: function (amount) {
        this.amount = amount;
    },
    getAmount: function () {
        return this.amount == undefined ? '' : this.amount;
    },
    setRate: function (rate) {
        this.rate = rate;
    },
    getRate: function () {
        return this.rate == undefined ? '' : this.rate;
    },
    setBasePremium: function (basePremium) {
        this.basePremium = basePremium;
    },
    getBasePremium: function () {
        return this.basePremium == undefined ? '' : this.basePremium;
    },
    setQuantity: function (quantity) {
        this.quantity = quantity;
    },
    getQuantity: function () {
        return this.quantity == undefined ? '' : this.quantity;
    },
};

/**
 * 关联产品对象
 * @param   conPlanCode     关联代码
 * @param   conKindCode     关联险种代码
 * @param   conProdCode     关联产品代码
 * @param   conProdName     关联产品名称
 */
var Production = function () {
}

Production.prototype = {
    //关联代码
    setPlanCode: function (planCode) {
        this.planCode = planCode;
    },
    getPlanCode: function () {
        return this.planCode || "";
    },
    //关联险种代码
    setKindCode: function (kindCode) {
        this.kindCode = kindCode;
    },
    getKindCode: function () {
        return this.kindCode || "";
    },
    //关联产品代码
    setProdCode: function (prodCode) {
        this.prodCode = prodCode;
    },
    getProdCode: function () {
        return this.prodCode || "";
    },
    //关联产品名称
    setProdName: function (prodName) {
        this.prodName = prodName;
    },
    getProdName: function () {
        return this.prodName || "";
    },
    //关联产品保费
    setProdAmount: function (prodAmount) {
        this.prodAmount = prodAmount;
    },
    getProdAmount: function () {
        return this.prodAmount || "";
    },
    //关联产品保额
    setProdPremium: function (prodPremium) {
        this.prodPremium = prodPremium;
    },
    getProdPremium: function () {
        return this.prodPremium || "";
    },
};

/**
 * 关系人对象:车主，投保人，被保险人，
 */
var Person = function (type) {
    this.setType(type);
}
Person.prototype = {
    setType: function (type) {
        this._type = type;
    },
    getType: function () {
        return this._type == undefined ? '' : this._type;
    },
    setName: function (name) {
        this._name = name;
    },
    getName: function () {
        return this._name == undefined ? '' : this._name;
    },
    setLic_no: function (lic_no) {
        this._lic_no = lic_no;
    },
    getLic_no: function () {
        return this._lic_no == undefined ? '' : this._lic_no;
    },

    setCellphone: function (cellphone) {
        this.cellphone = cellphone;
    },
    getCellphone: function () {
        return this.cellphone == undefined ? '' : this.cellphone;
    },
    setLic_type: function (lic_type) {
        this._lic_type = lic_type;
    },
    getLic_type: function () {
        return this._lic_type == undefined ? '01' : this._lic_type;
    },
    setSex: function (sex) {
        this._sex = sex;
    },
    getSex: function () {
        return this._sex == undefined ? '' : this._sex;
    },
    setRelation: function (relation) {
        this._relation = relation;
    },
    getRelation: function () {
        return this._relation == undefined ? '' : this._relation;
    },
    setEmail: function (email) {
        this._email = email;
    },
    getEmail: function () {
        return this._email == undefined ? '' : this._email;
    },
    //省
    setProvince: function (province) {
        this._province = province;
    },
    getProvince: function () {
        return this._province == undefined ? '' : this._province;
    },
    setCity: function (city) {
        this._city = city;
    },
    getCity: function () {
        return this._city == undefined ? '' : this._city;
    },
    setAddress: function (address) {
        this.address = address;
    },
    getAddress: function () {
        return this.address == undefined ? '' : this.address;
    },
    setCareerType: function (careerType) {
        this.occupationCodeGrade = careerType;
    },
    getCareerType: function () {
        return this.occupationCodeGrade == undefined ? '' : this.occupationCodeGrade;
    },
    setCareerTypeCode: function (careerTypeCode) {
        this.occupationCode = careerTypeCode;
    },
    getCareerTypeCode: function () {
        return this.occupationCode == undefined ? '' : this.occupationCode;
    },
};

/**
 * 报价单
 * @param   totalAmount  总价
 * @param   quotationVo  商业险结果信息
 * @param   quoPros  交强险结果信息
 *
 */
var Quotation = function () {
}
Quotation.prototype = {
    setTotalFee: function (totalFee) {
        this._totalFee = totalFee;
    },
    getTotalFee: function () {
        return this._totalFee == undefined ? '' : this._totalFee;
    },
    setQuotationVo: function (quotationVo) {
        this._quotationVo = quotationVo;
    },
    getQuotationVo: function () {
        return this._quotationVo == undefined ? '' : this._quotationVo;
    },
    setQuoPros: function (quoPros) {
        this._quoPros = quoPros;
    },
    getQuoPros: function () {
        return this._quoPros == undefined ? '' : this._quoPros;
    },
    setQuoDets: function (quoDets) {
        this._quoDets = quoDets;
    },
    getQuoDets: function () {
        return this._quoDets == undefined ? '' : this._quoDets;
    },
    setQuotationVehicleVo: function (quotationVehicleVo) {
        this._quotationVehicleVo = quotationVehicleVo;
    },
    getQuotationVehicleVo: function () {
        return this._quotationVehicleVo == undefined ? '' : this._quotationVehicleVo;
    },
    setQuotationCartaxVo: function (quotationCartaxVo) {
        this._quotationCartaxVo = quotationCartaxVo;
    },
    getQuotationCartaxVo: function () {
        return this._quotationCartaxVo == undefined ? '' : this._quotationCartaxVo;
    },
}

/**
 * 报价单分项
 */
var QuotationItem = function () {
}
QuotationItem.prototype = {
    setKindCode: function (kindCode) {
        this._kindCode = kindCode;
    },
    getKindCode: function () {
        return this._kindCode;
    },
    setKindName: function (kindName) {
        this._kindName = kindName;
    },
    getKindName: function () {
        return this._kindName;
    },
    setIsDuty: function (isduty) {
        this._isDuty = isduty;
    },
    getIsDuty: function () {
        return this._isDuty;
    },
    setFee: function (fee) {
        this._fee = fee;
    },
    getFee: function () {
        return this._fee;
    },
    setDutyFee: function (dutyfee) {
        this._fee = fee;
    },
    getDutyFee: function () {
        return this._dutyfee;
    },
}

/**
 * 投保地区        （省份）
 */
var Area = function (name, code, prov_name, prov_code) {
    this.setName(name);
    this.setCode(code);
    this.setProvCode(prov_code);
    this.setProvName(prov_name);
    //this.setCitys(Citys);
}
Area.prototype = {
    constructor: Area,
    setName: function (name) {
        this.name = name;
    },
    getName: function () {
        return this.name == undefined ? '' : this.name;
    },
    setCode: function (code) {
        this.code = code;
    },
    getCode: function () {
        return this.code == undefined ? '' : this.code;
    },
    setProvName: function (provName) {
        this.provName = provName;
    },
    getProvName: function () {
        return this.provName == undefined ? '' : this.provName;
    },
    setProvCode: function (provCode) {
        this.provCode = provCode;
    },
    getProvCode: function () {
        return this.provCode == undefined ? '' : this.provCode;
    },
    setCityCode: function (citycode) {
        this._citycode = citycode;
    },
    getCityCode: function () {
        return this._citycode == undefined ? '' : this._citycode;
    },
    setCityName: function (cityname) {
        this._cityname = cityname;
    },
    getCityName: function () {
        return this._cityname == undefined ? '' : this._cityname;
    },
    setProvinceNo: function (provinceNo) {
        this._provinceNo = provinceNo;
    },
    getProvinceNo: function () {
        return this._provinceNo == undefined ? '' : this._provinceNo;
    },
    setCarNoPrefix: function (carNoPrefix) {
        this.carNoPrefix = carNoPrefix;
    },
    getCarNoPrefix: function () {
        return this.carNoPrefix == undefined ? '' : this.carNoPrefix;
    },
    setCrossCity: function (crossCity) {
        this.crossCity = crossCity
    },
    getCrossCity: function () {
        return this.crossCity == undefined ? '' : this.crossCity;
    }
};

/**
 * 车型对象，其它对象后续添加
 * @param {Object} model_name
 * @param {Object} vehicleCode        车型编码
 * @param {Object} vehicleName        车型名称
 * @param {Object} hfCode            车船税减免标志
 * @param {Object} hfName            车船税减免名称
 * @param {Object} platmodelCode    行业车型
 * @param {Object} carYear            车辆年款
 * @param {Object} seatCount        核定载客数
 * @param {Object} tonCount            吨位数
 * @param {Object} purchasePrice    新车购置价
 * @param {Object} purchasePricetax        新车购置价（含税）
 * @param {Object} carKind            车辆种类
 * @param {Object} remark            车型版型
 * @param {Object} jsonObj             */
var VehicleType = function (model_name, vehicleCode, vehicleName,
                            hfCode, hfName, platmodelCode, carYear, seatCount, tonCount,
                            purchasePrice, purchasePricetax, carKind, remark) {
    this.setModelName(model_name);
    this.setVehicleCode(vehicleCode);
    this.setVehicleName(vehicleName);
    this.setHfCode(hfCode);
    this.setHfName(hfName);
    this.setPlatmodelCode(platmodelCode);
    this.setCarYear(carYear);
    this.setSeatCount(seatCount);
    this.setTonCount(tonCount);
    this.setPurchasePrice(purchasePrice);
    this.setPurchasePricetax(purchasePricetax);
    this.setCarKind(carKind);
    this.setRemark(remark);
}
VehicleType.prototype = {
    constructor: VehicleType,
    setModelName: function (model_name) {
        this._modelName = model_name;
    },
    getModelName: function () {
        return this._modelName == undefined ? '' : this._modelName;
    },
    setVehicleCode: function (vehicleCode) {
        this.vehicleCode = vehicleCode;
    },
    getVehicleCode: function () {
        return this.vehicleCode == undefined ? '' : this.vehicleCode;
    },
    setVehicleName: function (vehicleName) {
        this.vehicleName = vehicleName;
    },
    getVehicleName: function () {
        return this.vehicleName == undefined ? '' : this.vehicleName;
    },
    setHfCode: function (hfCode) {
        this.hfCode = hfCode;
    },
    getHfCode: function () {
        return this.hfCode == undefined ? '' : this.hfCode;
    },
    setHfName: function (hfName) {
        this.hfName = hfName;
    },
    getHfName: function () {
        return this.hfName == undefined ? '' : this.hfName;
    },
    setPlatmodelCode: function (platmodelCode) {
        this.platmodelCode = platmodelCode;
    },
    getPlatmodelCode: function () {
        return this.platmodelCode == undefined ? '' : this.platmodelCode;
    },
    setCarYear: function (carYear) {
        this.carYear = carYear;
    },
    getCarYear: function () {
        return this.carYear == undefined ? '' : this.carYear;
    },
    setSeatCount: function (seatCount) {
        this.seatCount = seatCount;
    },
    getSeatCount: function () {
        return this.seatCount == undefined ? '' : this.seatCount;
    },
    setTonCount: function (tonCount) {
        this.tonCount = tonCount;
    },
    getTonCount: function () {
        return this.tonCount == undefined ? '' : this.tonCount;
    },
    setPurchasePrice: function (purchasePrice) {
        this.purchasePrice = purchasePrice;
    },
    getPurchasePrice: function () {
        return this.purchasePrice == undefined ? '' : this.purchasePrice;
    },
    setPurchasePricetax: function (purchasePricetax) {
        this.purchasePricetax = purchasePricetax;
    },
    getPurchasePricetax: function () {
        return this.purchasePricetax == undefined ? '' : this.purchasePricetax;
    },
    setCarKind: function (carKind) {
        this.carKind = carKind;
    },
    getCarKind: function () {
        return this.carKind == undefined ? '' : this.carKind;
    },
    setRemark: function (remark) {
        this.remark = remark;
    },
    getRemark: function () {
        return this.remark == undefined ? '' : this.remark;
    },
    setJsonObj: function (jsonObj) {
        this.jsonObj = jsonObj;
    },
    getJsonObj: function () {
        return this.jsonObj == undefined ? '' : this.jsonObj;
    },
    setCountriesType: function (countriesType) {
        this.countriesType = countriesType;
    },
    getCountriesType: function () {
        return this.countriesType == undefined ? '' : this.countriesType;
    },
}

/**
 * 车辆对象
 * @param {Object} lic_no 车牌
 * @param {Object} carOwner 车主名称
 * @param {Object} identifyNumber 证件号码
 * @param {Object} brandName 品牌型号
 * @param {Object} modelCode 车辆识别码
 * @param {Object} engine_no 发动机号
 * @param {Object} vin_no vin码  车架号
 * @param {Object} enroll_date 初登日期
 */
var Vehicle = function (lic_no, carOwner, identifyNumber, brandName, modelCode, engine_no, vin_no, enroll_date) {
    this.setLic_no(lic_no);
    this.setCarOwner(carOwner);
    this.setIdentifyNumber(identifyNumber);
    this.setBrandName(brandName);
    this.setModelCode(modelCode);
    this.setEngine_no(engine_no);
    this.setVin_no(vin_no);
    this.setEnrollDate(enroll_date);
}

Vehicle.prototype = {
    constructor: Vehicle,
    setLic_no: function (lic_no) {
        this._lic_no = lic_no;
    },
    getLic_no: function () {
        return this._lic_no == undefined ? '' : this._lic_no;
    },
    setCarOwner: function (carOwner) {
        this.carOwner = carOwner;
    },
    getCarOwner: function () {
        return this.carOwner == undefined ? '' : this.carOwner;
    },
    setIdentifyNumber: function (identifyNumber) {
        this.identifyNumber = identifyNumber;
    },
    getIdentifyNumber: function () {
        return this.identifyNumber == undefined ? '' : this.identifyNumber;
    },
    setBrandName: function (brandName) {
        this.brandName = brandName;
    },
    getBrandName: function () {
        return this.brandName == undefined ? '' : this.brandName;
    },
    setModelCode: function (modelCode) {
        this.modelCode = modelCode;
    },
    getModelCode: function () {
        return this.modelCode == undefined ? '' : this.modelCode;
    },
    setEngine_no: function (engine_no) {
        this._engine_no = engine_no;
    },
    getEngine_no: function () {
        return this._engine_no == undefined ? '' : this._engine_no;
    },
    setVin_no: function (vin_no) {
        this._vin_no = vin_no;
    },
    getVin_no: function () {
        return this._vin_no == undefined ? '' : this._vin_no;
    },
    setEnrollDate: function (enroll_date) {
        this._enrollDate = enroll_date;
    },
    getEnrollDate: function () {
        return this._enrollDate == undefined ? '' : this._enrollDate;
    },
    setStartDateBi: function (startDateBi) {
        this.startDateBi = startDateBi;
    },
    getStartDateBi: function () {
        var day = new Date();
        day = day.addDays(1);
        return this.startDateBi == undefined ? day.toFomatorString("YYYY-MM-DD 00:00:00") : this.startDateBi;
    },
    setStartDateCi: function (startDateCi) {
        this.startDateCi = startDateCi;
    },
    getStartDateCi: function () {
        var day = new Date();
        day = day.addDays(1);
        return this.startDateCi == undefined ? day.toFomatorString("YYYY-MM-DD 00:00:00") : this.startDateCi;
    },
    setIsNew: function (isnew) {
        this.isnew = isnew;
    },
    getIsNew: function () {
        return this.isnew == undefined ? '' : this.isnew;
    }
};

/**
 * 业务对象
 */
var InsMbsVehicleObj = function () {

}

InsMbsVehicleObj.prototype = {
    get_from_db: function (key) {
        var str = null;
        str = localStorage.getItem(key);
        if (str != '') {
            return JSON.parse(str);
        }
        return null;
    },

    set_to_db: function (key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    },

    /**
     * 投保区域
     * @param {Object} area
     */
    setArea: function (area) {
        this._area = area;
        this.set_to_db('InsMbsVehicleObj_area', area);
    },
    getArea: function () {
        this._area = new Area();
        var t = this.get_from_db('InsMbsVehicleObj_area');
        Object.assign(this._area, t);
        return this._area;
    },

    /**
     * 车辆信息
     * @param {Object} vehicle
     */
    setVehicle: function (vehicle) {
        this._vehicle = vehicle;
        this.set_to_db('InsMbsVehicleObj_vehicle', this._vehicle);
    },
    getVehicle: function () {
        this._vehicle = new Vehicle();
        var t = this.get_from_db('InsMbsVehicleObj_vehicle');
        Object.assign(this._vehicle, t);
        return this._vehicle;
    },

    /**
     * 车型信息
     * @param {Object} vehicleType
     */
    setVehicleType: function (vehicleType) {
        this._vehicleType = vehicleType;
        this.set_to_db('InsMbsVehicleObj_vehicleType', vehicleType);
    },
    getVehicleType: function () {
        this._vehicleType = new VehicleType();
        var t = this.get_from_db('InsMbsVehicleObj_vehicleType');
        Object.assign(this._vehicleType, t);
        return this._vehicleType;
    },

    /**
     * 险别信息
     * @param {Object} kinds
     */
    setKinds: function (kinds) {
        this._kinds = kinds;
        this.set_to_db('InsMbsVehicleObj_kinds', kinds);
    },
    getKinds: function () {
        var t = this.get_from_db('InsMbsVehicleObj_kinds');
        var res = new Array();
        if (t == '' || t == null)
            return res;
        for (var i = 0; i < t.length; i++) {
            var kind = new Kind();
            Object.assign(kind, t[i]);
            kind.setItemKindNo((i + 1) + "");
            res.push(kind);
        }
        this._kinds = res;
        return this._kinds;
    },

    /**
     * 关联产品信息
     * @param {Object} production
     */
    setProductions: function (production) {
        this.productions = production;
        this.set_to_db('InsMbsVehicleObj_productions', production);
    },
    getProductions: function () {
        this.productions = new Production();
        var t = this.get_from_db('InsMbsVehicleObj_productions');
        Object.assign(this.productions, t);
        return this.productions;
    },

    /**
     * 车主
     * @param {Object} vehicle
     */
    setVehicleOwner: function (owner) {
        this._vehicleOwner = owner;
        this.set_to_db('InsMbsVehicleObj_vehicleOwner', owner);
    },
    getVehicleOwner: function () {
        this._vehicleOwner = new Person('carOwner');
        var t = this.get_from_db('InsMbsVehicleObj_vehicleOwner');
        Object.assign(this._vehicleOwner, t);
        return this._vehicleOwner;
    },
    /**
     * 投保人
     * @param {Object} buyer
     */
    setBuyer: function (buyer) {
        this._buyer = buyer;
        this.set_to_db('InsMbsVehicleObj_buyer', buyer);
    },
    getBuyer: function () {
        this._buyer = new Person();
        var t = this.get_from_db('InsMbsVehicleObj_buyer');
        Object.assign(this._buyer, t);
        return this._buyer;
    },
    /**
     * 受益人
     * @param {Object} benifit
     */
    setBenefit: function (benefit) {
        this._benefit = benefit;
        this.set_to_db('InsMbsVehicleObj_benefit', benefit);
    },
    getBenefit: function () {
        this._benefit = new Person();
        var t = this.get_from_db('InsMbsVehicleObj_benefit');
        Object.assign(this._benefit, t);
        return this._benefit;
    },
    /**
     * 多个受益人
     * @param {Object} benifits
     */
    setBenefits: function (benefit) {
        this._benefits = benefit;
        this.set_to_db('InsMbsVehicleObj_benefits', benefit);
    },
    getBenefits: function () {
        var t = this.get_from_db('InsMbsVehicleObj_benefits');
        var res = new Array();
        if (t == '' || t == null)
            return res;
        for (var i = 0; i < t.length; i++) {
            var benefits = new Person();
            Object.assign(benefits, t[i]);
            res.push(benefits);
        }
        this._benefits = res;
        return this._benefits;
    },
    /**
     * 报价
     * @param {Object} quotation
     */
    setQuotation: function (quotation) {
        this._quotation = quotation;
        this.set_to_db('InsMbsVehicleObj_quotation', quotation);
    },
    getQuotation: function () {
        this._quotation = new Person();
        var t = this.get_from_db('InsMbsVehicleObj_quotation');
        Object.assign(this._quotation, t);
        return this._quotation;
    },

};

/**
 * 业务对象
 */
var InsMbsVehicleOpeation = function () {

}

/**
 * 网络操作函数
 */
InsMbsVehicleOpeation.prototype = {
    /**
     * 车辆查询
     * @param {Object} vehicleLic_no 车牌
     * @param {Object} vehicleOwner 车主姓名
     * @param {Object} lic_no  身份证
     * @param {Object} cb 查询回调接口，车辆对象
     */
    serarchVehicle: function (vehicleLic_no, vehicleOwner, lic_no, cb) {
        MobileApp.setUrl(_vehicle);
        //初始化参数
        var req = {
            "cmd": "CarModelQuery",
            "licenseNo": vehicleLic_no,
            "carOwner": vehicleOwner,
            "identifyNumber": lic_no
        };

        MobileApp.sendRequest(req, function (res) {
            //获取返回对象
            var res = JSON.parse(res);
            if (res.result) {
                var carModelInfo = res.payload.carModelInfo;
                var obj = new InsMbsVehicleObj();
                var v = obj.getVehicle();
                v.setLic_no(vehicleLic_no);
                v.setCarOwner(carModelInfo.carOwner);
                v.setIdentifyNumber(carModelInfo.identifyNumber);
                v.setBrandName(carModelInfo.brandName);
                v.setModelCode(carModelInfo.modelCode);
                v.setEngine_no(carModelInfo.engineNo);
                v.setEnrollDate(carModelInfo.enrollDate);
                v.setStartDateBi(carModelInfo.endDateBi);
                v.setStartDateCi(carModelInfo.endDateCi);
                obj.setVehicle(v);
                cb(v);
            } else {
                cb(false);
                /*if(res.error == "没有满足条件的记录"){
                    return;
                }
                alertShow(res.error);
                $(".ttoast-btn").on("click",function () {
                    window.location.href = "ins_car_owner.html"
                })*/
            }

        });

    },

    /**
     * 车型名称
     * @param {Object} modelName
     * @param {Object} cb 车型查询接口，车型对象数组
     */
    serarchVehicleType: function (modelName, cb) {
        var v = new VehicleType();
        var vs = new Array();
        vs.push(v);
        cb(vs);
    },
    /**
     * 投保地区
     * @param {Object} cb 投保地区接口回调，地区对象数组
     */
    serarchArea: function (index, size, cb) {
        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "FindProCitys",
            "index": index,
            "size": size
        };

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result) {
                var provinces = result.payload.provinceCity.provinces;
                var vs = new Array();
                for (var i = 0; i < provinces.length; i++) {
                    var citys = provinces[i].citys
                    for (var j = 0; j < citys.length; j++) {
                        var v = new Area();
                        v.setProvCode(provinces[i].provCode);
                        v.setProvName(provinces[i].name);
                        v.setCityCode(citys[j].code);
                        v.setCityName(citys[j].name);
                        v.setProvinceNo(citys[j].provinceNo);
                        v.setCarNoPrefix(citys[j].carNoPrefix);
                        v.setCrossCity(citys[j].crossCity);
                        vs.push(v);
                    }
                }
                cb(vs);
            } else {
                cb(false);
                alertShow(res.error);
            }
        });
    },
    /**
     * 所有险种险种
     * @param {Object} cb 险种接口回调，险别对象数组
     */
    serarchKinds: function (cb) {
        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "InsuranceTypes",
            "isdefault": null,
            "cityCode": null,
        };

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result) {
                var insurances = result.payload.insurances
                var vs = new Array();
                var vos = result.payload.vos;
                for (var j = 0; j < vos.length; j++) {
                    var v = vos[j];
                    vs.push(v);
                }
                var obj = new InsMbsVehicleObj();
                //obj.setKinds(vs);
                cb(vs);
            } else {
                cb(false);
                alertShow(res.error);
            }
        });
    },
    /**
     * 默认险种
     * @param {Object} cb 默认险种接口回调，险别对象数组
     */
    serarchDefaultKinds: function (cb) {
        MobileApp.setUrl(_vehicle);
        //初始化参数
        var req = {
            "cmd": "InsuranceTypes",
            "isdefault": "1",
            "cityCode": null,
        };

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result);
            if (result.result) {
                var insurances = result.payload.insurances;
                var vs = new Array();
                var vos = result.payload.vos;
                for (var j = 0; j < vos.length; j++) {

                    var v = vos[j];

                    if (v.isNonVehicle == true) {
                        continue;
                    }

                    if (v.isDefaultNoDuct == "1") {
                        v.isNoDuty = true;
                    } else {
                        v.isNoDuty = false;
                    }
                    //if(v.kindCode == "T"){
                    //	v.quantity = 0;
                    //}
                    v.entryValueVos = null;
                    vs.push(v);
                }
                var obj = new InsMbsVehicleObj();
                obj.setKinds(vs);
                //				cb(vs);
                cb(true);
            } else {
                cb(false);
                alertShow(res.error);
            }
        });
    },
    /**
     * 报价
     * @param { Object} obj 投保参数对象 InsMbsVehicleObj
     * @param {Object} cb 默认险种接口回调，险别对象数组
     */
    quotation: function (quotationNo, cb, params) {
        MobileApp.setUrl(_vehicle);
        var app = new InsMbsVehicleObj();
        //车型对象
        var vehicleType = app.getVehicleType();
        //车辆对象
        var vehicle = app.getVehicle();
        //投保地区
        var area = app.getArea();
        //车主对象
        var vehicleOwner = app.getVehicleOwner();
        //车主对象
        var vehicleOwner = app.getVehicleOwner();

        //清空对象
        app.setQuotation("");

        //厂牌名称
        var vehicleName = vehicleType.getVehicleName();
        //车牌号
        var lic_no = vehicle.getLic_no();
        //车主名称
        var vehicleOwnerName = vehicleOwner.getName();
        //车型对象
        var jsonObj = vehicleType.getJsonObj();
        jsonObj = jsonObj;
        //用户代码 UserCode
        var userCode = localStorage.getItem("orguser___xxx");
        var comCode = localStorage.getItem("comcode___xxx");
        var packagetype = localStorage.getItem("packagetype___xxx");
        var packagecode = localStorage.getItem("packagecode___xxx");

        var account = MobileApp.getCookie("account");

        if (account == "") {
            //account = "E18E76997CDB";
            loadingHide();
            checkAccount();
            return;
        }
        var startDateBi = vehicle.getStartDateBi();
        if (startDateBi.length <= 10) {
            startDateBi += " 00:00:00"
        }
        var startDateCi = vehicle.getStartDateCi();
        if (startDateCi.length <= 10) {
            startDateCi += " 00:00:00"
        }

        var newdate = (new Date()).toFomatorString("YYYY-MM-DD 00:00:00");
        if (startDateBi <= newdate) {
            var day = new Date();
            day = day.addDays(1);
            startDateBi = day.toFomatorString("YYYY-MM-DD 00:00:00");
        }
        ;
        if (startDateCi <= newdate) {
            var day = new Date();
            day = day.addDays(1);
            startDateCi = day.toFomatorString("YYYY-MM-DD 00:00:00");
        }
        ;


        //初始化参数
        if (quotationNo != null && quotationNo != "") {
            var req = {
                "cmd": "QuotationInfo",
                "quotationNo": quotationNo
            };
        } else {
            //是否存在险种
            var kinds = app.getKinds();
            if (kinds == '') {
                loadingHide();
                return;
            }

            var req = {
                "cmd": "QuotationInfo",
                "account": account,
                "comCode": comCode,
                "packagetype": packagetype,
                "packageCode": packagecode,
                "handlerCode": "",
                "areaCode": area.getCityCode(), //投保地区
                "userCode": userCode,
                //"userCode": "241001137", //测试
                "enrollDate": vehicle.getEnrollDate(), //初登日期
                "licenseNo": vehicle.getLic_no(), //车牌号
                "engineNo": vehicle.getEngine_no(), //发动机号
                "frameNo": vehicle.getVin_no(), //车架号
                "brandName": vehicleName, //厂牌名称
                "negotiationValue": vehicleType.getPurchasePrice(), //协商价值
                "actureValue": vehicleType.getPurchasePricetax(),
                "carOwner": vehicleOwnerName, //车主名称
                "credentialNo": vehicleOwner.getLic_no(), //车主证件号码
                "jsonObj": jsonObj,
                "kinds": kinds, //保险责任信息 列表
                "startDateBi": startDateBi, //商业险起保时间
                "startDateCi": startDateCi, // 交强险起保时间
            };
            var areacode = localStorage.getItem("areacode___xxx");
            if (areacode) {
                req.areaCode = areacode;
            }
            if (params != undefined) {
                $.each(params, function (key) {
                    req[key] = params[key];
                });
            }

        }

        MobileApp.sendRequest(req, function (res) {
            //获取返回对象
            var res = JSON.parse(res);
            if (res.result) {
                var v = new Quotation();
                v = res.payload.quotationBigVo;
                app.setQuotation(v);
                cb(v);
            } else {
                //alertShow(res.error);
                //window.location.href = 'ins_car_info.html?action=closepage'
                cb(false, res.error);
            }
        });
    },

    /**
     * 报价(验证码)
     * @param { Object} vo 验证码对象  （第一次报价时有验证码时返回的对象）
     * @param         checkcode  验证码
     * @param {Object} cb 默认险种接口回调，险别对象数组
     */
    QuotationVerifyPart: function (vo, checkcode, cb) {
        MobileApp.setUrl(_vehicle);

        var req = {
            "cmd": "QuotationVerifyPart",
            "quotationNo": vo.quotationNo,				//报价单号
            "querysequanceno": vo.querysequanceno,		//商业险投保查询码
            "checkcode": checkcode,				//验证码图片base64编码（不区分大小写）
            "querylogid": vo.querylogid,				//查询日志编码
            "riskType": vo.riskType,				//0-单商业，1-单交强，2-关联出单
            "comCode": vo.comCode,
            "areaCode": vo.areaCode,				//投保地区
            "userCode": vo.userCode,				//员工代码 (20170417 用户代码，12位)
            "account": vo.account,					//自己系统的用户
            "type": vo.type,						//报价单类型 新保 续保 转保[1,2,3]
            "licenseNo": vo.licenseNo,				//车牌号,未上牌可以传空
            "engineNo": vo.engineNo,				//发动机号
            "frameNo": vo.frameNo,					//车架号
            "carOwner": vo.carOwner,				//车主名称
            "credentialNo": vo.credentialNo,			//车主证件号码
            "vehicleType": vo.vehicleType				//车型类型(家庭自用车/货车/企业车 1,2,3)
        };

        MobileApp.sendRequest(req, function (res) {
            //获取返回对象
            var res = JSON.parse(res);
            if (res.result) {
                var v = new Quotation();
                v = res.payload.quotationBigVo;
                app.setQuotation(v);
                cb(v);
            } else {
                alertShow(res.error);
                cb(false);
            }
        });
    },

    /**
     * 获取quotation对象
     * @param {Object} quotationNo
     * @param {Object} cb
     */
    getQuotation: function (quotationNo, cb) {

        MobileApp.setUrl(_vehicle);
        var app = new InsMbsVehicleObj();

        app.setQuotation("");

        //初始化参数
        var req = {
            "cmd": "QuotationInfo",
            "quotationNo": quotationNo,
        };
        MobileApp.sendRequest(req, function (res) {
            //获取返回对象
            var res = JSON.parse(res);

            if (res.payload) {
                var v = new Quotation();
                v = res.payload.quotationBigVo;
                app.setQuotation(v);
                cb(v);
            } else {
                cb("false");
                alertShow(res.error);
            }
        });
    },

    /**
     * 投保
     * @param
     * @param {Object} cb 默认险种接口回调，险别对象数组
     */
    insure: function (addr, cb) {
        //获取对象
        var app = new InsMbsVehicleObj();
        //报价对象
        var quotation = app.getQuotation();
        //车主对象
        var vehicleOwner = app.getVehicleOwner();
        if (vehicleOwner.getCellphone().isEmpty()) {
            loadingHide();
            alertShow("请填写车主电话！");
            cb(false);
            return;
        }

        if (vehicleOwner.getLic_no().isEmpty()) {
            loadingHide();
            alertShow("请填写车主身份证！");
            cb(false);
            return;
        }
        if (vehicleOwner.getName().isEmpty()) {
            loadingHide();
            alertShow("请填写车主名！");
            cb(false);
            return;
        }
        if (vehicleOwner.getAddress().isEmpty()) {
            loadingHide();
            alertShow("请填写车主地址！");
            cb(false);
            return;
        }
        /*if(vehicleOwner.getEmail().isEmpty()) {
            loadingHide();
            alertShow("请填写车主邮箱！");
            cb(false);
            return;
        }*/
        MobileApp.setUrl(_vehicle);

        //受益人
        var benefit = app.getBenefit();

        //投保人
        var buyer = app.getBuyer();

        //投保人验证
        if (buyer.getName().isEmpty()) {
            loadingHide();
            alertShow("请填写投保人！");
            cb(false);
            return;
        }
        if (buyer.getLic_no().isEmpty()) {
            loadingHide();
            alertShow("请填写投保人身份证！");
            cb(false);
            return;
        }
        if (buyer.getCellphone().isEmpty()) {
            loadingHide();
            alertShow("请填写投保人电话！");
            cb(false);
            return;
        }
        if (buyer.getAddress().isEmpty()) {
            loadingHide();
            alertShow("请填写投保人地址！");
            cb(false);
            return;
        }
        /*if(buyer.getEmail().isEmpty()) {
            loadingHide();
            alertShow("请填写投保人邮箱！");
            cb(false);
            return;
        }*/
        //受益人验证
        if (benefit.getName().isEmpty()) {
            loadingHide();
            alertShow("请填写被保人姓名！");
            cb(false);
            return;
        }
        if (benefit.getLic_no().isEmpty()) {
            loadingHide();
            alertShow("请填写被保人身份证！");
            cb(false);
            return;
        }
        if (benefit.getCellphone().isEmpty()) {
            loadingHide();
            alertShow("请填写被保人电话！");
            cb(false);
            return;
        }
        /*if(benefit.getEmail().isEmpty()) {
            loadingHide();
            alertShow("请填写被保人邮箱！");
            cb(false);
            return;
        }*/

        //初始化参数
        var req;
        req = {
            "cmd": "EnquiryToProposal",
            "quotationNo": quotation.quotationVo.quotationNo,
            //"quotationNo":"D1F398175E54",
            "deliverFullname": addr.name,
            "deliverMobile": addr.mobile,
            "address": addr.province + addr.city + addr.address,
            "base64Sign": "",
            "insuredList": [{
                "insuredFlag": "1",
                "insuredName": benefit.getName(),
                "identifyNumber": benefit.getLic_no(),
                "mobile": benefit.getCellphone(),
                "email": benefit.getEmail(),
                //"postCode": "410101",
                "insuredProvince": benefit.getProvince(),
                "insuredCity": benefit.getCity(),
                "insuredAdress": benefit.getProvince() + benefit.getCity() + benefit.getAddress(),
            }, {
                "insuredFlag": "2",
                "insuredName": buyer.getName(),
                "identifyNumber": buyer.getLic_no(),
                "mobile": buyer.getCellphone(),

                "email": buyer.getEmail(),
                //"postCode": "410101",
                "insuredProvince": buyer.getProvince(),
                "insuredCity": buyer.getCity(),
                "insuredAdress": buyer.getProvince() + buyer.getCity() + buyer.getAddress(),
            }],
            "isDifference": "1"
        };
        if (vehicleOwner.getLic_no() != buyer.getLic_no() || vehicleOwner.getLic_no() != benefit.getLic_no()) {
            req = {
                "cmd": "EnquiryToProposal",
                "quotationNo": quotation.quotationVo.quotationNo,
                //"quotationNo":"D1F398175E54",
                "deliverFullname": addr.name,
                "deliverMobile": addr.mobile,
                "address": addr.province + addr.city + addr.address,
                "base64Sign": "",
                "insuredList": [{
                    "insuredFlag": "1",
                    "insuredName": benefit.getName(),
                    "identifyNumber": benefit.getLic_no(),
                    "mobile": benefit.getCellphone(),
                    "email": benefit.getEmail(),
                    //"postCode": "410101",
                    "insuredProvince": benefit.getProvince(),
                    "insuredCity": benefit.getCity(),
                    "insuredAdress": benefit.getProvince() + benefit.getCity() + benefit.getAddress(),
                }, {
                    "insuredFlag": "2",
                    "insuredName": buyer.getName(),
                    "identifyNumber": buyer.getLic_no(),
                    "mobile": buyer.getCellphone(),

                    "email": buyer.getEmail(),
                    //"postCode": "410101",
                    "insuredProvince": buyer.getProvince(),
                    "insuredCity": buyer.getCity(),
                    "insuredAdress": buyer.getProvince() + buyer.getCity() + buyer.getAddress(),
                }],
                "isDifference": "0"
            };
        }

        var buyCon = MobileApp.getParameterValue("buyCon");
        if (buyCon === "true") {
            var copy = sessionStorage.getItem("COPY");
            var obj = new InsMbsVehicleObj();
            var production = obj.getProductions();
            req.planCode = production.getPlanCode();
            req.kindCode = production.getKindCode();
            req.amount = production.getProdPremium() * parseInt(copy);
            req.defalutValue = production.getProdAmount() * parseInt(copy);
            req.mult = copy;
        }

        MobileApp.sendRequest(req, function (res) {
            loadingHide();
            //获取返回对象
            var res = JSON.parse(res);
            if (res.result) {
                //console.log(v.quotationVo.status);
                var proposalVo = res.payload.vo;
                if (proposalVo.preundwrtResult == "1") {
                    //proposalNobi  商业险   proposalNoci 交强险
                    alertShoww("待核保（请转人工)\r\n商业险：" + proposalVo.proposalNobi + "\r\n交强险：" + proposalVo.proposalNoci);
                    //window.location.href = 'ins_products.html?action=newpage'
                } else if (proposalVo.preundwrtResult == "2") {
                    alertShow("下发修改!");
                    cb(false);
                } else {
                    cb(true);
                }
            } else {
                loadingHide();
                alertShow(res.error);
                cb(false);
            }
        });
    },
    /**
     * 落地
     * @param {Object} cb 默认险种接口回调，险别对象数组
     */
    genInsure: function (quation_no, cb) {
        var v = new Quotation();
        cb(v);
    },
    /**
     * 获取车型信息
     * @param {Object} ENGINENUMBER        发动机号
     * @param {Object} VINCODE 车型查询接口，车型对象数组
     * @param {Object} FIRSTREGISTERDATE  注册日期
     */
    NewCarModelQuery: function (modelName, ENGINENUMBER, VINCODE, FIRSTREGISTERDATE, cb) {
        var a = FIRSTREGISTERDATE.toDate().toFomatorString("YYYY-MM-DD");
        if (a == "") {
            loadingHide();
            alertShow("请填写注册日期！");
        }
        var newdate = (new Date()).toFomatorString("YYYY-MM-DD");
        if (a <= newdate) {
            MobileApp.setUrl(_vehicle);

            //初始化参数
            var req = {
                "cmd": "NewCarModelQuery",
                "ENGINENUMBER": ENGINENUMBER,
                "VINCODE": VINCODE,
                "FIRSTREGISTERDATE": FIRSTREGISTERDATE,
                "modelName": modelName
            };

            MobileApp.sendRequest(req, function (result) {
                //获取返回对象
                var result = JSON.parse(result, true);
                if (result.result) {
                    var cars = result.payload.cars;
                    var vs = new Array();
                    for (var i = 0; i < cars.length; i++) {
                        var v = new VehicleType();
                        v.setVehicleCode(cars[i].vehicleCode);
                        v.setVehicleName(cars[i].vehicleName);
                        v.setHfCode(cars[i].hfCode);
                        v.setHfName(cars[i].hfName);
                        v.setPlatmodelCode(cars[i].platmodelCode);
                        v.setCarYear(cars[i].carYear);
                        v.setSeatCount(cars[i].seatCount);
                        v.setTonCount(cars[i].tonCount);
                        v.setPurchasePrice(cars[i].purchasePrice);
                        v.setPurchasePricetax(cars[i].purchasePricetax);
                        v.setCarKind(cars[i].carKind);
                        v.setRemark(cars[i].remark);
                        v.setJsonObj(cars[i].jsonObj);
                        v.setCountriesType(cars[i].countriesType);
                        vs.push(v);
                    }
                    ;
                    cb(vs);
                } else {
                    cb(new Array());
                    alertShow(result.error);
                }
            });
        } else {
            loadingHide();
            alertShow("注册日期不能大于当前日期！");
        }
    },

    /*
     * 支付
     * quotationNo   报价单号
     * cb    回调函数
     * type   1 微信扫码支付   2 通联支付  3微信立即支付
     * */
    OnlinePay: function (type, mobileNumber, cb) {

        //获取对象
        var app = new InsMbsVehicleObj();
        var quotation = app.getQuotation();

        MobileApp.setUrl(_vehicle);
        var req = "";
        if (type == "1") {
            //微信扫码支付
            req = {
                "cmd": "OnlinePay",
                "quotationNo": quotation.quotationVo.quotationNo,
                "type": type
            };
        } else if (type == 2) {
            //通联支付
            req = {
                "cmd": "OnlinePay",
                "quotationNo": quotation.quotationVo.quotationNo,
                //"quotationNo": "6269ED5FA11F",
                "mobileNumber": mobileNumber,
                "type": type
            };
        } else if (type == 3) {
            //微信立即支付
            req = {
                "cmd": "OnlinePay",
                "quotationNo": quotation.quotationVo.quotationNo,
                "type": type
            };
        }

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result);
            if (result.result) {
                if (type == "1") {
                    //微信扫码支付
                    var orderInfo = result.payload.orderInfo;

                    cb(true, orderInfo);
                } else if (type == "2") {
                    //通联支付
                    var ResPayOrderTL = result.payload.orderinfotlvo;

                    cb(true, ResPayOrderTL);
                } else if (type == "3") {
                    //通联支付
                    var orderWeichantVo = result.payload.orderWeichantVo;

                    cb(true, orderWeichantVo);
                }
            } else {
                alertShow(result.error);
                cb(false, null);
            }
            ;

        });
    },

    /*
     * 获得订单列表
     *    报价单号
     * cb    回调函数
     * */
    Quotations: function (index, size, status, sdate, edate, cb) {

        //获取系统Account
        var account = MobileApp.getCookie("account");

        if (account == "") {
            //account = "E18E76997CDB";
            checkAccount();
            return;
        }

        //获取对象
        var app = new InsMbsVehicleObj();
        var quotation = app.getQuotation();

        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "Quotations",
            "quo_account": account,
            "index": index,
            "size": size,
            "status": status,
            "sdate": sdate,
            "edate": edate
        };

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result.result) {
                //console.log(result.payload.quotationsVo);
                cb(result.payload.quotationsVo);
            } else {
                cb("false");
                alertShow(result.error);
            }
            ;
        });
    },

    /*
     * 获取地址列表
     * add_account   系统用户
     * cb    回调函数
     * */
    CommonAddress: function (cb) {

        //获取对象
        var app = new InsMbsVehicleObj();

        var account = MobileApp.getCookie("account");

        if (account == "") {
            //account = "E18E76997CDB";
            checkAccount();
            return;
        }

        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "CommonAddress",
            "add_account": account
        };

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result.result) {
                var commonAddressVo = result.payload.commonAddressBigVo.commonAddressVo;
                cb(commonAddressVo);
            } else {
                cb(false);
                alertShow(result.error);
            }
            ;

        });
    },

    /*
     * 新增地址
     * add_account   系统用户
     * cb    回调函数
     * */
    AddCommonAddress: function (addr3, cb) {

        //获取对象
        var app = new InsMbsVehicleObj();
        var account = MobileApp.getCookie("account");

        if (account == "") {
            //account = "E18E76997CDB";
            checkAccount();
            return;
        }

        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "AddCommonAddress",
            "add_account": account,
            "name": addr3.name,
            "mobile": addr3.num,
            "address": addr3.detailArea,
            "province": addr3.province,
            "city": addr3.city
        };
        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result.result) {
                var saveOrDel = result.payload.saveOrDel;
                cb(saveOrDel);
            } else {
                cb(false);
                alertShow(result.error);
            }
        });
    },

    /*
     * 更新地址
     * add_account   系统用户
     * cb    回调函数
     * */
    UpCommonAddress: function (addr3, cb) {

        //获取对象
        var app = new InsMbsVehicleObj();
        var account = MobileApp.getCookie("account");
        if (account == "") {
            //account = "E18E76997CDB";
            checkAccount();
            return;
        }

        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "UpCommonAddress",
            "addressNo": addr3.addressNo,
            "name": addr3.name,
            "mobile": addr3.num,
            "address": addr3.detailArea,
            "province": addr3.province,
            "city": addr3.city
        };
        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result.result) {
                var saveOrDel = result.payload.saveOrDel;
                cb(saveOrDel);
            } else {
                cb(false);
                alertShow(result.error);
            }
        });
    },

    /*
     * 删除邮递地址
     * add_account   系统用户
     * cb    回调函数
     * */
    DelCommonAddress: function (addressNo, cb) {

        //获取对象
        var app = new InsMbsVehicleObj();

        var account = MobileApp.getCookie("account");
        if (account == "") {
            //account = "E18E76997CDB";
            checkAccount();
            return;
        }

        MobileApp.setUrl(_vehicle);

        //初始化参数
        var req = {
            "cmd": "DelCommonAddress",
            "addressNo": addressNo
        };

        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            var result = JSON.parse(result, true);
            if (result.result) {
                var saveOrDel = result.payload.saveOrDel;
                cb(saveOrDel);
            } else {
                cb(false);
                alertShow(result.error);
            }
            ;

        });
    },

};

/**
 * 用户检查,检查是否本地缓存了用户的报价出单机构和用户
 */
function userChecker() {
    /**
     * 网络获取
     */
    var account = MobileApp.getCookie("account");
    if (account == "") {
        // PC端测试,使用固定账号
        //		return;
        //account = "E18E76997CDB";
        checkAccount();
        return;
    }
    MobileApp.setUrl(_account);
    var req = {
        "account": account,
        "cmd": "GetAccountVo"
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {
            exts = res.payload.exts;
            if (exts.length <= 0) {
                window.location.href = '../my/ins_employee_confirm.html?action=newpage'
            }
            ;
        } else {
            alertShow(res.error);
        }
    });
};