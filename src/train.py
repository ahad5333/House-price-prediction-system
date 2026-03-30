from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, RandomizedSearchCV, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.pipeline import Pipeline
import joblib
import numpy as np
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

def train_model(X, y, preprocessor):
    """
    Train and optimize RandomForest model with hyperparameter tuning.
    Returns trained pipeline and metrics.
    """
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    logger.info(f"Training set size: {X_train.shape}")
    logger.info(f"Test set size: {X_test.shape}")
    
    # Random Forest with pipeline
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', RandomForestRegressor(random_state=42, n_jobs=-1))
    ])

    # Hyperparameter tuning with optimized search space
    param_dist = {
        'model__n_estimators': [100, 200, 300, 500],
        'model__max_depth': [10, 15, 20, 25, None],
        'model__min_samples_split': [2, 5, 10],
        'model__min_samples_leaf': [1, 2, 4],
        'model__max_features': ['sqrt', 'log2'],
        'model__bootstrap': [True, False]
    }

    search = RandomizedSearchCV(
        pipeline,
        param_distributions=param_dist,
        n_iter=20,  # Increased from 10
        scoring='neg_root_mean_squared_error',
        cv=5,  # Better cross-validation
        verbose=1,
        random_state=42,
        n_jobs=-1
    )

    search.fit(X_train, y_train)
    best_model = search.best_estimator_

    # Detailed predictions and metrics
    y_pred_train = best_model.predict(X_train)
    y_pred_test = best_model.predict(X_test)
    
    # Calculate comprehensive metrics
    train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    train_r2 = r2_score(y_train, y_pred_train)
    test_r2 = r2_score(y_test, y_pred_test)
    train_mae = mean_absolute_error(y_train, y_pred_train)
    test_mae = mean_absolute_error(y_test, y_pred_test)
    
    # Cross-validation score
    cv_scores = cross_val_score(
        best_model, X_train, y_train,
        cv=5, scoring='r2'
    )
    
    # Print metrics
    print("\n" + "="*50)
    print("MODEL PERFORMANCE METRICS")
    print("="*50)
    print(f"Best Parameters: {search.best_params_}")
    print(f"\nTrain RMSE: ${train_rmse:,.2f}")
    print(f"Test RMSE: ${test_rmse:,.2f}")
    print(f"\nTrain MAE: ${train_mae:,.2f}")
    print(f"Test MAE: ${test_mae:,.2f}")
    print(f"\nTrain R² Score: {train_r2:.4f}")
    print(f"Test R² Score: {test_r2:.4f}")
    print(f"\nCross-validation R² Scores: {cv_scores}")
    print(f"Mean CV R² Score: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
    print("="*50 + "\n")
    
    # Save full pipeline
    joblib.dump(best_model, "models/rf_pipeline.pkl")
    logger.info("Pipeline saved to models/rf_pipeline.pkl")
    
    # Save metadata
    metadata = {
        'timestamp': datetime.now().isoformat(),
        'train_rmse': float(train_rmse),
        'test_rmse': float(test_rmse),
        'train_r2': float(train_r2),
        'test_r2': float(test_r2),
        'train_mae': float(train_mae),
        'test_mae': float(test_mae),
        'cv_mean_r2': float(cv_scores.mean()),
        'cv_std_r2': float(cv_scores.std()),
        'best_params': search.best_params_
    }
    
    # Save metadata
    import json
    with open('models/model_metadata.json', 'w') as f:
        json.dump(metadata, f, indent=4, default=str)

    return best_model, {
        'train_rmse': train_rmse,
        'test_rmse': test_rmse,
        'train_r2': train_r2,
        'test_r2': test_r2,
        'train_mae': train_mae,
        'test_mae': test_mae,
        'cv_scores': cv_scores,
        'best_params': search.best_params_
    }

def train_gradient_boosting(X, y, preprocessor):
    """
    Alternative: Train Gradient Boosting model for comparison.
    """
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        ))
    ])
    
    pipeline.fit(X_train, y_train)
    
    y_pred = pipeline.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    print(f"\nGradient Boosting RMSE: {rmse:.2f}")
    print(f"Gradient Boosting R²: {r2:.4f}")
    
    return pipeline