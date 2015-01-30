/* AUTO-GENERATED FILE.  DO NOT MODIFY.
 *
 * This class was automatically generated by
 * Appcelerator. It should not be modified by hand.
 */
package com.bd.Newpaper;

import org.appcelerator.kroll.runtime.v8.V8Runtime;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollModuleInfo;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.util.KrollAssetHelper;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiRootActivity;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import android.util.Log;

public final class NewsPaperApplication extends TiApplication
{
	private static final String TAG = "NewsPaperApplication";

	@Override
	public void onCreate()
	{
		super.onCreate();

		appInfo = new NewsPaperAppInfo(this);
		postAppInfo();



		V8Runtime runtime = new V8Runtime();


		runtime.addExternalModule("com.appcelerator.apm", com.appcelerator.apm.CrittercismBootstrap.class);
	

		runtime.addExternalModule("ti.cloudpush", ti.cloudpush.CloudpushBootstrap.class);
	


		KrollRuntime.init(this, runtime);

		stylesheet = new ApplicationStylesheet();
		postOnCreate();


	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	



		// Custom modules
		KrollModuleInfo moduleInfo;
	
		
		com.crittercism.ti.CrittercismModule.onAppCreate(this);
		

		moduleInfo = new KrollModuleInfo(
			"crittercism", "com.appcelerator.apm", "ec36d909-befa-4ca1-b518-1e3f152ead61", "1.1.1",
			"App Crash Reporting", "Crittercism", "",
			"Copyright (c) 2013 by Crittercism");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		

		moduleInfo = new KrollModuleInfo(
			"cloudpush", "ti.cloudpush", "2d542783-c83c-4597-bd61-1073aa16ece2", "3.3.7",
			"ACS Push notifications for Android", "Dawson Toth, Jeff English, Paul Lv and Jon Alter", "Appcelerator Commercial License",
			"Copyright (c) 2012-2014 by Appcelerator, Inc.");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	

	}

	@Override
	public void verifyCustomModules(TiRootActivity rootActivity)
	{

		org.appcelerator.titanium.TiVerify verify = new org.appcelerator.titanium.TiVerify(rootActivity, this);
		verify.verify();

	}
}
