projectname ="Alpha portugal intergration"
totaltask=32
blockedtask=3
avghourspertask=4.5
completedtask=11

def calculatingmetric(): 
    Netactivetask=totaltask-completedtask
    Truecompletionrate=(completedtask/totaltask-blockedtask)*100
    Totalhourexpended=(completedtask*avghourspertask)
    Projecthoursremaining=(blockedtask*avghourspertask)

<<<<<<< HEAD
    print("project:",projectname)
    print("Netactivetask:",Netactivetask)
    print("Truecompletionrate:",Truecompletionrate)
    print("Totalhourexpended:",Totalhourexpended)
    print("Projecthoursremaining:",Projecthoursremaining)
    
    from datetime import datetime; print("DEBUG: System runtime timestamp:", datetime.now().isoformat())
calculatingmetric()
=======
  print("project:",projectname)
  print("Netactivetask:",Netactivetask)
  print("Truecompletionrate:",Truecompletionrate)
  print("Totalhourexpended:",Totalhourexpended)
  print("Projecthoursremaining:",Projecthoursremaining)
  calculatingmetric()
  from datetime import datetime; print("DEBUG: System runtime timestamp:", datetime.now().isoformat())
>>>>>>> feat/library-requirements
